import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createApp() {
  const app = express();
  
  // Basic middleware
  app.use(express.json());
  
  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  return app;
}

export async function createDevServer() {
  const app = await createApp();
  const server = createServer(app);
  
  // In development, use Vite's dev server
  const { createServer: createViteServer } = await import('vite');
  
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: resolve(__dirname, '..'),
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);
  
  return { app, server };
}