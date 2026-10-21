import type { IncomingMessage, ServerResponse } from 'http';
import { handleSendVerification } from '../../src/server-auth';

export default async function handler(req: any, res: any) {
  // Support CORS for international and cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const result = await handleSendVerification(body);
    return res.status(result.statusCode).json(result.data);
    } catch (err: any) {
    console.error('[AUTH] send-verification error:', err.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your verification code right now. Please try again.',
    });
  }
}