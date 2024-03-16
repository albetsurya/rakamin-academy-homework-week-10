const multer = require("multer");

const upload = multer({
  fileFilter: function (req, file, cb) {
    const acceptType = ["png", "jpg", "jpeg"]; // Image format
    const format = file.originalname.split(".").pop();

    if (!acceptType.includes(format)) {
      cb(null, false);
    } else {
      file.format = `.${format}`;
      cb(null, true);
    }
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + file.format);
    },
  }),
});

module.exports = () => upload.single("image");
