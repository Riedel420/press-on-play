import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";

async function startServer() {
  try {
    const app = express();
    const httpServer = createServer(app);

    // Basic middleware
    app.use(express.json());

    // Health check endpoint
    app.get('/api/health', (_req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // Register API routes
    await registerRoutes(app);

    // Start server
    const port = 3001;
    httpServer.listen(port, '127.0.0.1', () => {
      console.log(`API server running at http://127.0.0.1:${port}`);
    });

    // Handle errors
    httpServer.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
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
