const fs = require('fs').promises;
const path = require('path');
const convert = require('heic-convert');

const convertHeicToPngMiddleware = (UPLOADS_FOLDER) => {
  return async (req, res, next) => {
    // Check if req.file is present
    if (req.file && (req.file.mimetype === 'image/heic' || req.file.mimetype === 'image/heif')) {
      const heicBuffer = await fs.readFile(req.file.path);
      const pngBuffer = await convert({
        buffer: heicBuffer,
        format: 'PNG'
      });

      const originalFileName = path.basename(req.file.originalname, path.extname(req.file.originalname));
      const currentDateTime = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, ''); // Format current date and time
      const pngFileName = `${originalFileName}_${currentDateTime}.png`; // Add current date and time to file name
      const pngFilePath = path.join(UPLOADS_FOLDER, pngFileName);

      await fs.writeFile(pngFilePath, pngBuffer);

      // Remove the original HEIC file
      await fs.unlink(req.file.path);

      // Update file properties
      req.file.path = pngFilePath;
      req.file.filename = pngFileName;
      req.file.mimetype = 'image/png';
    }

    next();
  }
};

module.exports = convertHeicToPngMiddleware;
