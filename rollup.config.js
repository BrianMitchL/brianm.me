import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const production = !process.env.ROLLUP_WATCH;

const main = {
  input: 'src-js/lastfm-artists.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'lastFmArtists',
    file: 'src/assets/js/lastfm-artists.js',
  },
  plugins: [
    svelte({ css: false }),

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

    // If we're building for production, minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const fun = {
  input: 'src-js/fun.mjs',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'fun',
    file: 'src/assets/js/fun.mjs',
  },
  plugins: [
    // If we're building for production, minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const noFun = {
  input: 'src-js/no-fun.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'noFun',
    file: 'src/assets/js/no-fun.js',
  },
  plugins: [
    // If we're building for production, minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [main, fun, noFun];
