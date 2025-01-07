const fs = require("fs");

function unlinkImage(imagePaths) {
  if (typeof imagePaths === "string") {
    // If it's a single image path, convert it to an array
    imagePaths = [imagePaths];
  }

  imagePaths.forEach((imagePath) => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Error deleting the file ${imagePath}:`, err);
      } else {
        console.log(`File ${imagePath} deleted successfully`);
      }
    });
  });
}

module.exports = unlinkImage
