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
const compareRoutes = require("./routes/compareRoutes");
const resumeRoutes = require("./routes/resume"); // NEW
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const dangerRoutes = require("./routes/dangerRoutes");
const googleRoutes = require("./routes/googleRoutes");

const app = express();

// ======================================
// Middleware
// ======================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-resume-analyzer-ochre-five.vercel.app",
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================
// Static Upload Folder
// ======================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ======================================
// API Routes
// ======================================

app.use("/api/health", healthRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use(
  "/api/notifications",
  notificationRoutes
);


app.use("/api/upload", uploadRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/compare", compareRoutes);

// NEW Resume Routes

app.use("/api/resume", resumeRoutes);
app.use("/api/danger", dangerRoutes);
app.use("/api/google", googleRoutes);

// ======================================
// 404 Handler
// ======================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ======================================
// Global Error Handler
// ======================================

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;