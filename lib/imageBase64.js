const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');
const Cache = require('@11ty/eleventy-cache-assets');
const { AssetCache } = Cache;
const sharp = require('sharp');

async function imageBase64(filePath, options) {
  const hash = createHash('sha256');
  hash.update(filePath);

  const asset = new AssetCache(`image-base64--${hash.digest('hex')}`);

  if (asset.isCacheValid('1d')) {
    return asset.getCachedValue();
  }

  let file;
  if (/^https?:\/\//.test(filePath)) {
    file = await Cache(filePath, {
      duration: '30d',
      type: 'buffer',
    });
  } else {
    if (filePath.split('/').some((segment) => ['.', '..'].includes(segment))) {
      throw new Error(
        `[imageBase64] Found relative paths in image "${filePath}"`
      );
    }

    const resolvedPath = path.join(options.input, ...filePath.split('/'));

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`[imageBase64] File does not exist "${filePath}"`);
    }
    file = fs.readFileSync(resolvedPath);
  }

  const image = await sharp(file);
  const metadata = await image.metadata();
  const buffer = await image
    .resize({
      fit: sharp.fit.cover,
      height: 400,
    })
    .toBuffer();

  const base64 = `data:image/${metadata.format};base64,${buffer.toString(
    'base64'
  )}`;

  await asset.save(base64, 'buffer');

  return base64;
}

module.exports = function pluginImageBase64(eleventyConfig, options = {}) {
  const mergedOptions = {
    input: options.input ?? __dirname,
  };
  function create(filePath) {
    return imageBase64(filePath, mergedOptions);
  }

  eleventyConfig.addFilter('imageBase64', create);
};
