const multer = require("multer");
const path = require("path");

// ==============================
// Storage
// ==============================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      "avatar-" +
      Date.now() +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// ==============================
// Image Filter
// ==============================

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};

// ==============================
// Upload Middleware
// ==============================

const avatarUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3 MB
  },
});

module.exports = avatarUpload;