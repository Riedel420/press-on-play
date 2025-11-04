import express from "express";
import cors from "cors";

const app = express();

// Allow Vite dev server to connect
app.use(cors({ origin: "http://localhost:5173" }));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start server on IPv4 localhost
app.listen(3000, "127.0.0.1", () => {
  console.log("Backend running at http://127.0.0.1:3000");
});