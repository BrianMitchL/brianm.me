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
          name: 'Space Grotesk',
          data: fs.readFileSync('./src/assets/fonts/SpaceGrotesk-Bold.otf'),
          weight: 700,
          style: 'bold',
        },
        {
          name: 'Satoshi',
          data: fs.readFileSync('./src/assets/fonts/Satoshi-Medium.woff'),
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Berkeley Mono',
          data: fs.readFileSync('./src/assets/fonts/BerkeleyMono-Regular.woff'),
          weight: 400,
          style: 'normal',
        },
      ],
    },
  };

  eleventyConfig.addPlugin(EleventyPluginOgImage, eleventyPluginOgImageOptions);
};
