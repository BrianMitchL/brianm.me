const sharp = require('sharp');
const { createHash } = require('crypto');
const { AssetCache } = require('@11ty/eleventy-cache-assets');
const path = require('path');
const fs = require('fs');

async function render(data) {
  // don't actually do the image work when running locally
  if (!data.site.isProduction) {
    return fs.readFileSync(path.join(__dirname, 'placeholder.png'));
  }
  const hash = createHash('sha256');
  hash.update(data.content);

  const asset = new AssetCache(`svgAsPng--${hash.digest('hex')}`);

  if (asset.isCacheValid('30d')) {
    return asset.getCachedValue();
  }

  const buffer = await sharp(Buffer.from(data.content), { density: 144 })
    .png({
      // use pallet for 8-bit color and smaller file sizes, but slower
      palette: true,
    })
    .toBuffer();

  await asset.save(buffer, 'buffer');

  return buffer;
}

module.exports = render;
