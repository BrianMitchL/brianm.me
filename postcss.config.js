const postcssImport = require('postcss-import');
const postcssNesting = require('postcss-nesting');
const postcssOKLabFunction = require('@csstools/postcss-oklab-function');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = (ctx) => {
  const config = {
    plugins: [
      postcssImport,
      postcssNesting,
      postcssOKLabFunction({ preserve: true }),
      autoprefixer,
    ],
  };

  if (ctx.env === 'production') {
    config.plugins.push(
      cssnano({
        preset: 'default',
      }),
    );
  }

  return config;
};
