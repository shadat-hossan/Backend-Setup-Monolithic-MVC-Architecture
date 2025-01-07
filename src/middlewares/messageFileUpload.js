const multer = require("multer");
const path = require("path");

module.exports = function (UPLOADS_FOLDER) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER); // Use the provided destination folder
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const filename =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, filename + fileExt);
    },
  });

  const allowedTypes = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'image',
    'audio',
    'video'
  ];

  const upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 5000000, // 5MB
    // },
    fileFilter: (req, file, cb) => {
      const fileType = file.mimetype.split('/')[0]; // Extract the file type from the MIME type

      if (allowedTypes.includes(file.mimetype) || allowedTypes.includes(fileType)) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type"));
      }
    },
  });
  return upload; // Return the configured multer upload middleware
};
