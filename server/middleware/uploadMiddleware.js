import multer from "multer";

// ================= MEMORY STORAGE =================
// Required for Cloudinary base64 upload
const storage = multer.memoryStorage();

// ================= FILE FILTER =================
const fileFilter = (req, file, cb) => {

  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }

};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB per image
  }
});

export default upload;
