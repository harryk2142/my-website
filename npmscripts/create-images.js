import fs from "fs";
import sharp from "sharp";
import path from "path";

const pathPrefix = "./public/images/blog";
const inputDir = pathPrefix + "/original";
const outputDirs = {
  blog: pathPrefix,
  sharing: pathPrefix + "/sharing",
  small: pathPrefix + "/small",
};
// Stelle sicher, dass die Ausgabeordner existieren
Object.values(outputDirs).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Fehler beim Lesen des Verzeichnisses:", err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const fileNameWithoutExt = path.parse(file).name;

    // Überprüfe, ob die Datei ein Bild ist
    if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      // Für den Blog in WebP konvertieren
      sharp(inputFilePath)
      .resize(1024, 1024, { fit: "fill", withoutEnlargement:false })
        .toFormat("webp", {
          quality:80
        })
        .toFile(`${outputDirs.blog}/${fileNameWithoutExt}.webp`);

      // Für Sharing als JPEG mit 512x512
      sharp(inputFilePath)
        .resize(512, 512, { fit: "inside" })
        .toFormat("jpeg")
        .toFile(`${outputDirs.sharing}/${fileNameWithoutExt}.jpeg`);

      // Für Small als WebP mit 256x256
      sharp(inputFilePath)
        .resize(256, 256, { fit: "inside" })
        .toFormat("webp")
        .toFile(`${outputDirs.small}/${fileNameWithoutExt}.webp`);
    }
  });
  console.log("\x1b[32m%s\x1b[0m", "All images converted successfully!");
});
