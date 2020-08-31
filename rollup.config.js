import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';

const production = !process.env.ROLLUP_WATCH;

const main = {
  input: 'src/lastfm-artists.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'lastFmArtists',
    file: 'assets/js/lastfm-artists.js',
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

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const headingAnchors = {
  input: 'src/heading-anchors.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'headingAnchors',
    file: 'assets/js/heading-anchors.js',
  },
  plugins: [
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const fun = {
  input: 'src/fun.mjs',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'fun',
    file: 'assets/js/fun.mjs',
  },
  plugins: [
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

const noFun = {
  input: 'src/no-fun.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'noFun',
    file: 'assets/js/no-fun.js',
  },
  plugins: [
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),
    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    production && filesize(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default [main, headingAnchors, fun, noFun];

let started = false;

function serve() {
  return {
    writeBundle() {
      if (!started) {
        started = true;

        require('child_process').spawn('npm', ['run', 'start'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        });
      }
    },
  };
}
