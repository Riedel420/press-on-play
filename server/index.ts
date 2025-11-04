import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.ts";
import { setupVite, serveStatic, log } from "./vite.ts";

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize and start server
(async () => {
  try {
    log("Starting server initialization...");
    
    const server = await registerRoutes(app);

    // Error handling middleware
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    log(`Error caught in middleware: ${err.message || 'Unknown error'}`);
    if (res.headersSent) {
      return next(err);
    }
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ 
      error: message,
      timestamp: new Date().toISOString()
    });
  });    // Setup Vite middleware in development
    if (process.env.NODE_ENV !== "production") {
      log("Setting up Vite middleware for development...");
      await setupVite(app, server);
    } else {
      log("Setting up static file serving for production...");
      serveStatic(app);
    }

    // Start server
    const port = 3000;
    const host = '0.0.0.0';
    server.listen(port, host, () => {
      log(`API server listening on ${host}:${port}`);
    });
  } catch (error) {
    log(`Server initialization error: ${error}`);
    process.exit(1);
  }
})();
