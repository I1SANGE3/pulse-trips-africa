import { handleCheckDetails } from '../../src/server-auth';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const target = req.query?.target;
    const result = await handleCheckDetails(typeof target === 'string' ? target : undefined);
    return res.json(result);
  } catch {
    return res.json({ exists: false });
  }
}
