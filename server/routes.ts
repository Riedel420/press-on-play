import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.ts";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  app.get('/api/health', (_req: Request, res: Response) => {
    try {
      res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV || 'development'
      });
    } catch (error) {
      console.error('[Health Check Error]:', error);
      res.status(500).json({ 
        error: 'Health check failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
