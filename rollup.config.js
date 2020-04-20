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
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      css: (css) => {
        css.write('assets/css/lastfm-artists.css');
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

const theme = {
  input: 'src/theme.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'theme',
    file: 'assets/js/theme.js',
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

export default [main, theme];

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
