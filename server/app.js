const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const healthRoutes = require("./routes/healthRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const compareRoutes = require("./routes/compareRoutes"); // NEW

const app = express();

// Middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-analyzer-ochre-five.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// API Routes
app.use("/api/health", healthRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/compare", compareRoutes); // NEW

module.exports = app;