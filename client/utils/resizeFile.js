import Resizer from "react-image-file-resizer";

module.exports = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      640,
      480,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
