const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadFor = (folderName) => {
  // Build full folder path relative to this file's location
  const folderPath = path.join(__dirname, "..", "..", "public", "media", folderName);

  // Create folder if not exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const filename = `image-${Date.now()}-${Math.floor(Math.random() * 1000000000)}${ext}`;
      cb(null, filename);
    }
  });

  return multer({ storage });
};

module.exports = { uploadFor };