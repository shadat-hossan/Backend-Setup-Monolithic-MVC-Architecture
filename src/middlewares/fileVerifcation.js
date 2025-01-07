const upload = require("./fileUpload");
const logger = require("../config/logger");
const response = require("../config/response");
const imageVerification = (req, res, next) => {
  const files = req.files || [];

  if (files.length === 0) {
    logger.error();
    return res.status(403).json(
      response({
        code: "403",
        message: "Images not found",
      })
    );
  } else {
    next();
  }
};

module.exports = imageVerification;
