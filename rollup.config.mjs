import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

const config = {
  output: {
    sourcemap: true,
    format: 'es',
    dir: '_site/assets/js',
  },
  plugins: [
    resolve({
      browser: true,
    }),
    postcss({
      config: {
        path: './postcss.config.mjs',
        ctx: {
          env: production ? 'production' : null,
        },
      },
    }),
    production && terser(),
  ],
};

export default [
  {
    input: 'src/assets/js/fun.mjs',
    ...config,
  },
  {
    input: 'src/assets/js/image-compare.mjs',
    ...config,
  },
];
