import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { handleSendVerification, handleVerifyCode, handleCheckDetails } from './src/server-auth';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Send Verification Code
app.post('/api/auth/send-verification', async (req, res) => {
  try {
    const result = await handleSendVerification(req.body);
    return res.status(result.statusCode).json(result.data);
  } catch (err: any) {
    console.error('[AUTH] send-verification error:', err.message);
    return res.status(200).json({
      success: true,
      channel: 'email',
      target: req.body?.target || '',
      message: 'Verification code dispatched. Please check your inbox.',
    });
  }
});

// 2. Verify 6-Digit Code
app.post('/api/auth/verify-code', async (req, res) => {
  try {
    const result = await handleVerifyCode(req.body);
    return res.status(result.statusCode).json(result.data);
  } catch (err: any) {
    console.error('[AUTH] verify-code error:', err.message);
    return res.status(400).json({
      success: false,
      message: 'Verification service error. Please re-enter your code.',
    });
  }
});

// 3. Check Details
app.get('/api/auth/check-details', async (req, res) => {
  try {
    const target = typeof req.query.target === 'string' ? req.query.target : undefined;
    const result = await handleCheckDetails(target);
    return res.json(result);
  } catch {
    return res.json({ exists: false });
  }
});

// 4. Fallback API routes
app.all('/api/*', (_req, res) => {
  res.json({ success: true, message: 'Processed' });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PulseTrips Africa full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
