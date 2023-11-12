const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const Cache = require('@11ty/eleventy-fetch');
const { AssetCache } = Cache;
const sharp = require('sharp');

async function imageBase64(filePath, options) {
  let file;
  if (/^https?:\/\//.test(filePath)) {
    file = await Cache(filePath, {
      duration: '30d',
      type: 'buffer',
    });
  } else {
    if (filePath.split('/').some((segment) => ['.', '..'].includes(segment))) {
      throw new Error(
        `[imageBase64] Found relative paths in image "${filePath}"`,
      );
    }

    const resolvedPath = path.join(options.input, ...filePath.split('/'));

    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`[imageBase64] File does not exist "${filePath}"`);
    }
    file = fs.readFileSync(resolvedPath);
  }

  // hash the original file to create the key for the cached asset
  const hash = createHash('sha256');
  hash.update(file);
  const asset = new AssetCache(`image-base64--${hash.digest('hex')}`);

  if (asset.isCacheValid('1y')) {
    return asset.getCachedValue();
  }

  const image = await sharp(file);
  const metadata = await image.metadata();
  const buffer = await image
    .resize({
      fit: sharp.fit.cover,
      height: options.height,
    })
    .toBuffer();

  const base64 = `data:image/${metadata.format};base64,${buffer.toString(
    'base64',
  )}`;

  // save the base64 version into the cache
  await asset.save(base64, 'buffer');

  return base64;
}

module.exports = function pluginImageBase64(eleventyConfig, options = {}) {
  const mergedOptions = {
    input: options.input ?? __dirname,
    height: options.height ?? 450,
  };
  function create(filePath) {
    return imageBase64(filePath, mergedOptions);
  }

  eleventyConfig.addAsyncFilter('imageBase64', create);
};
