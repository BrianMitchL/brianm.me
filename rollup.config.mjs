import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

const config = {
  output: {
    sourcemap: true,
    format: 'es',
    dir: '_site/assets/js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
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
    production && filesize(),
  ],
};

export default [
  {
    input: 'src/assets/js/fun.mjs',
    ...config,
  },
  {
    input: 'src/assets/js/compare-image.mjs',
    ...config,
  },
];
