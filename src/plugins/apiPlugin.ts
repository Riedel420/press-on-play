import { Plugin } from 'vite';

export function apiPlugin(): Plugin {
  return {
    name: 'api',
    configureServer(server) {
      server.middlewares.use('/api/health', (req, res) => {
        console.log(`[${new Date().toISOString()}] Health check requested`);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'ok',
          time: new Date().toISOString(),
          mode: process.env.NODE_ENV || 'development'
        }));
      });

      // Add other API routes here
      server.middlewares.use('/api', (req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
        next();
      });
    }
  };
}