import fs from "fs";
import sharp from "sharp";

const pathToImages = "./public/images/blog";

fs.readdir(pathToImages, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".webp") && !file.endsWith("_small.webp")) {
      const inputPath = `${pathToImages}/${file}`;
      const outputPathShare = `${pathToImages}/sharing/${file.replace(
        ".webp",
        ".jpg"
      )}`;
      const outputPathPreview = `${pathToImages}/small/${file}`;

      sharp(inputPath)
        .resize(512, 512, { fit: "inside" })
        .jpeg()
        .toFile(outputPathShare)
        // .then(() => {
        //   console.log(`Og image converted`);
        // })
        .catch((err) => {
          console.error(err);
        });

      sharp(inputPath)
        .resize(256, 265, { fit: "inside" })
        .webp()
        .toFile(outputPathPreview)
        .catch((err) => {
          console.error(err);
        });
    }
  });
  console.log("\x1b[32m%s\x1b[0m", "All og images converted successfully!");
});
