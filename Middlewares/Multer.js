const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`; // set the name of the uploaded file
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
