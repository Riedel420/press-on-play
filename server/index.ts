import express, { Request, Response, NextFunction } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS for development
app.use(cors());

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoints
app.get("/api/health", (req: Request, res: Response) => {
  console.log(`Health check from ${req.ip}`);
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be last)
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;