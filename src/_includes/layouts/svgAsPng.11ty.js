const sharp = require('sharp');
const { createHash } = require('crypto');
const { AssetCache } = require('@11ty/eleventy-cache-assets');

async function render(data) {
  const hash = createHash('sha256');
  hash.update(data.site.isProduction.toString() + data.content);

  const asset = new AssetCache(`svgAsPng--${hash.digest('hex')}`);

  if (asset.isCacheValid('30d')) {
    return asset.getCachedValue();
  }

  const buffer = await sharp(Buffer.from(data.content), { density: 144 })
    .png({
      // use pallet for 8-bit color and smaller file sizes, but slower
      palette: data.site.isProduction,
    })
    .toBuffer();

  await asset.save(buffer, 'buffer');

  return buffer;
}

module.exports = render;
