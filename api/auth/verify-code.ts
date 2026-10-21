import { handleVerifyCode } from '../../src/server-auth';

export default async function handler(req: any, res: any) {
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
    const result = await handleVerifyCode(body);
    return res.status(result.statusCode).json(result.data);
  } catch (err: any) {
    console.error('[API verify-code]', err);
    return res.status(400).json({
      success: false,
      message: 'Verification service error. Please re-enter your code.',
    });
  }
}
