const postcssOKLabFunction = require('@csstools/postcss-oklab-function');

module.exports = (ctx) => ({
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    postcssOKLabFunction({ preserve: true }),
    require('autoprefixer'),
    ...(ctx.env === 'production'
      ? [
          require('cssnano')({
            preset: [
              'default',
              {
                calc: {
                  preserve: true,
                },
              },
            ],
          }),
        ]
      : []),
  ],
});
