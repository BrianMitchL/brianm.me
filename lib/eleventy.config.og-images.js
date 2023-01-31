const fs = require('node:fs');
const EleventyPluginOgImage = require('eleventy-plugin-og-image');

/** @param { import('@11ty/eleventy/src/UserConfig') } eleventyConfig */
module.exports = (eleventyConfig) => {
  /** @type { import('eleventy-plugin-og-image').EleventyPluginOgImageOptions } */
  const eleventyPluginOgImageOptions = {
    outputFileExtension: 'png',
    generateHTML: (outputUrl) => outputUrl,
    satoriOptions: {
      fonts: [
        {
          name: 'BebasNeue-Regular',
          data: fs.readFileSync(
            './src/assets/fonts/bebas-neue/BebasNeue-Regular.woff'
          ),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: fs.readFileSync(
            './src/assets/fonts/satoshi/Satoshi-Medium.woff'
          ),
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Berkeley Mono',
          data: fs.readFileSync(
            './src/assets/fonts/berkeley-mono/BerkeleyMono-Regular.woff'
          ),
          weight: 400,
          style: 'normal',
        },
      ],
    },
  };

  eleventyConfig.addPlugin(EleventyPluginOgImage, eleventyPluginOgImageOptions);
};
