import express from "express";
import { createServer } from "http";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createApp() {
  const app = express();
  const httpServer = createServer(app);

  // Basic middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API endpoints
  app.get('/api/health', (req, res) => {
    console.log(`Health check from ${req.ip}`);
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString()
    });
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: { server: httpServer } 
    },
    appType: 'custom'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // Serve static files from the dist directory in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(resolve(__dirname, '../dist')));
  }

  // Handle SPA routing - serve index.html for all non-API routes
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // Load the index.html file
      let template = await vite.transformIndexHtml(
        url,
        '<div id="root"></div>'
      );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.stack);
        res.status(500).end(e.stack);
      } else {
        next(e);
      }
    }
  });

  return httpServer;
}

// Start the server
createApp().then(server => {
  const port = 3000;
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
