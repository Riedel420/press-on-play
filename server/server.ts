import express from 'express';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function startServer() {
  try {
    const app = express();
    const server = createServer(app);

    // Basic middleware
    app.use(express.json());

    // Add CORS headers for development
    app.use((_req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });

    // Basic request logging
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
      });
      next();
    });

    // API routes
    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok', time: new Date().toISOString() });
    });

    // Error handling
    app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });

    // Start server
    const port = 3000;
    server.listen(port, '127.0.0.1', () => {
      console.log(`API Server running at http://127.0.0.1:${port}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down...');
      server.close(() => process.exit(0));
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer().catch(error => {
  console.error('Server startup error:', error);
  process.exit(1);
});