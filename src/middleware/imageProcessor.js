const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

const VARIANTS = {
  small:  { width: 320,  quality: 65 },
  medium: { width: 640,  quality: 70 },
  large:  { width: 1200, quality: 75 },
};

async function processImage(inputPath, baseName) {
  const results = [];

  for (const [variant, opts] of Object.entries(VARIANTS)) {
    const outName = `${baseName}-${variant}.webp`;
    const outPath = path.join(UPLOADS_DIR, outName);

    const info = await sharp(inputPath)
      .resize({ width: opts.width, withoutEnlargement: true })
      .webp({ quality: opts.quality, effort: 6 })
      .toFile(outPath);

    results.push({
      variant,
      filename: outName,
      width: info.width,
      height: info.height,
      size: info.size,
    });
  }

  return results;
}

async function convertStaticImage(filename) {
  const inputPath = path.join(IMAGES_DIR, filename);
  if (!fs.existsSync(inputPath)) return null;

  const ext = path.extname(filename);
  const baseName = path.basename(filename, ext);

  return processImage(inputPath, baseName);
}

module.exports = { processImage, convertStaticImage, VARIANTS, UPLOADS_DIR };
