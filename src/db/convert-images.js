/**
 * Converts all existing static images to WebP with 3 variants.
 * Run: node src/db/convert-images.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
const { initDatabase } = require('./init');
const Media = require('../models/Media');
const { convertStaticImage } = require('../middleware/imageProcessor');

const IMAGE_FILES = [
  'paesaggio-moschini.jpg',
  'franco-moschini.jpg',
  'fondazione-design-terrae.jpg',
  'fondazione-franco-moschini.jpg',
  'interno-marche.jpg',
  'jeppe.jpg',
];

async function convert() {
  await initDatabase();

  for (const filename of IMAGE_FILES) {
    console.log(`Converting ${filename}...`);
    try {
      const variants = await convertStaticImage(filename);
      if (!variants) {
        console.log(`  Skipped (file not found)`);
        continue;
      }

      // Find the media record
      const media = Media.getByFilename(filename);
      if (!media) {
        console.log(`  No media record found for ${filename}`);
        continue;
      }

      // Save variants
      for (const v of variants) {
        Media.addVariant(media.id, v);
        console.log(`  ${v.variant}: ${v.width}x${v.height} — ${(v.size / 1024).toFixed(1)} KB`);
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
    }
  }

  console.log('Done!');
}

convert().then(() => process.exit(0));
