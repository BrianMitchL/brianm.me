const { DateTime } = require('luxon');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const pluginEmoji = require('eleventy-plugin-emoji');
const pluginSitemap = require('@quasibit/eleventy-plugin-sitemap');
const pluginSchema = require('@quasibit/eleventy-plugin-schema');
const pluginExcerpt = require('eleventy-plugin-excerpt');
const markdownIt = require('markdown-it');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItTOCDoneRight = require('markdown-it-toc-done-right');
const uslug = require('uslug');
const { minify } = require('terser');
const htmlmin = require('html-minifier');
const octicons = require('@primer/octicons');
const pluginImageBase64 = require('./lib/imageBase64');

const siteData = require('./src/_data/site.js');

const dir = {
  input: 'src',
  includes: '_includes',
  data: '_data',
  output: '_site',
};

const hashCache = new Map();
function hashify(filePath) {
  if (typeof filePath !== 'string') {
    throw new Error('the hashify filter must be used with a string');
  }
  if (!siteData.isProduction) {
    return filePath;
  }

  if (hashCache.has(filePath)) {
    return hashCache.get(filePath);
  }

  const hash = crypto.createHash('sha256');
  const fileContent = fs.readFileSync(dir.input + '/' + filePath);
  hash.update(fileContent);
  const hashedPath = `${filePath}?h=${hash.digest('hex')}`;
  hashCache.set(filePath, hashedPath);

  return hashedPath;
}

const iconCache = new Map();
async function loadIcon(icon) {
  if (!icon) throw new Error('No icon given');

  const iconPath = path.resolve(
    __dirname,
    dir.input,
    dir.includes,
    'icons',
    `${icon}.svg`
  );
  if (iconCache.has(iconPath)) {
    return iconCache.get(iconPath);
  }
  const data = await fs.promises.readFile(iconPath, 'utf-8');
  iconCache.set(iconPath, data);
  return data;
}

function uslugify(str) {
  return uslug(str);
}
module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(emojiReadTime, {
    emoji: '📖',
  });
  eleventyConfig.addPlugin(pluginEmoji, {
    element: 'span',
    className: 'emoji',
  });
  eleventyConfig.addPlugin(pluginSitemap, {
    lastModifiedProperty: 'modified',
    sitemap: {
      hostname: siteData.url,
    },
  });
  eleventyConfig.addPlugin(pluginSchema);
  eleventyConfig.addPlugin(pluginExcerpt);
  eleventyConfig.addPlugin(pluginImageBase64, {
    input: path.resolve(__dirname, dir.input),
  });

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  eleventyConfig.addShortcode('octicon', function (icon) {
    return octicons[icon].toSVG();
  });

  eleventyConfig.addNunjucksAsyncShortcode(
    'icon',
    async function (icon, color) {
      const svg = await loadIcon(icon);

      return `<span class="icon" ${
        color ? `style="color: ${color}"` : ''
      } aria-hidden="true">${svg}</span>`;
    }
  );

  eleventyConfig.addFilter('hashify', hashify);

  eleventyConfig.addFilter('toUTCDate', (dateObj) => {
    // add back the offset from UTC to the date
    // https://www.11ty.dev/docs/dates/#dates-off-by-one-day
    // Eleventy parses the date as UTC, which is different than the date
    // front matter property, where it's created with a local timezone
    const zoneName = DateTime.local().zoneName;
    return DateTime.fromJSDate(dateObj, { zone: 'utc' })
      .setZone(zoneName, { keepLocalTime: true })
      .toJSDate();
  });

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'MMM d, yyyy'
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addNunjucksAsyncFilter(
    'jsmin',
    async function (code, callback) {
      if (siteData.isProduction) {
        try {
          const minified = await minify(code);
          callback(null, minified.code);
        } catch (err) {
          console.error('Terser error: ', err);
          // Fail gracefully.
          callback(null, code);
        }
      } else {
        callback(null, code);
      }
    }
  );

  eleventyConfig.addCollection('tagList', function (collection) {
    const tags = collection.getAll().reduce((tags, item) => {
      return tags.concat(
        item.data.tags?.filter((item) => {
          // this list should match the `filter` list in tag.njk
          return !['all', 'post'].includes(item);
        }) ?? []
      );
    }, []);

    // sort tags by frequency and remove duplicates
    return Object.entries(
      tags.reduce((counter, key) => {
        counter[key] = 1 + counter[key] || 1;
        return counter;
      }, {})
    )
      .sort((a, b) => b[1] - a[1])
      .map((x) => x[0]);
  });

  eleventyConfig.addPassthroughCopy({
    'node_modules/@fontsource/inter/': 'assets/fonts/inter/',
  });
  eleventyConfig.addPassthroughCopy('src/assets/js/*.{js,mjs,map}');
  eleventyConfig.addPassthroughCopy('src/assets/css/*.css');
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/*.{txt,ico,png}');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  eleventyConfig.addWatchTarget('src/assets/*.{css,js,mjs}');

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
  })
    .use(markdownItDeflist)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink({
        class: 'heading-link',
        safariReaderFix: true,
      }),
      slugify: uslugify,
    })
    .use(markdownItFootnote)
    .use(markdownItTOCDoneRight, {
      containerClass: 'toc-container',
      slugify: uslugify,
    });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync(`${dir.output}/404.html`);

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  eleventyConfig.addTransform('html-minifier', (value, outputPath) => {
    if (outputPath && outputPath.includes('.html')) {
      return htmlmin.minify(value, {
        collapseWhitespace: true,
      });
    }
    return value;
  });

  return {
    pathPrefix: '/',
    dir,
  };
};
