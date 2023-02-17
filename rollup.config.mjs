import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

const fun = {
  input: 'src/assets/js/src/fun.mjs',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'fun',
    file: 'src/assets/js/fun.mjs',
  },
  plugins: [
    resolve(),
    postcss({
      minimize: production,
      config: {
        path: './postcss.config.js',
      },
    }),
    // If we're building for production, minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const compareImage = {
  input: 'src/assets/js/src/compare-image.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'compareImage',
    file: 'src/assets/js/compare-image.mjs',
  },
  plugins: [
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    postcss({
      minimize: production,
      config: {
        path: './postcss.config.js',
      },
    }),

    // If we're building for production, minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [fun, compareImage];
