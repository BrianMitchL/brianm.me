require('dotenv').config();
const { DateTime, Settings } = require('luxon');
Settings.defaultZone = 'utc';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginWebc = require("@11ty/eleventy-plugin-webc");
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
const slugify = require('@sindresorhus/slugify');
const { minify } = require('terser');
const htmlmin = require('html-minifier');
const octicons = require('@primer/octicons');

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

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(require('./lib/eleventy.config.drafts.js'));
  eleventyConfig.addPlugin(require('./lib/eleventy.config.imageBase64'), {
    input: path.resolve(__dirname, dir.input),
  });
  eleventyConfig.addPlugin(require('./lib/eleventy.config.og-images.js'));
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
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

  eleventyConfig.addShortcode('octicon', function (icon) {
    return octicons[icon].toSVG();
  });

  eleventyConfig.addAsyncShortcode('icon', async function (icon, color) {
    const svg = await loadIcon(icon);

    return `<span class="icon" ${
      color ? `style="color: ${color}"` : ''
    } aria-hidden="true">${svg}</span>`;
  });

  eleventyConfig.addFilter('hashify', hashify);

  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('MMM d, yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addAsyncFilter('jsmin', async function (code) {
    if (siteData.isProduction) {
      try {
        const minified = await minify(code);
        return minified.code;
      } catch (err) {
        console.error('Terser error: ', err);
        // Fail gracefully.
        return code;
      }
    } else {
      return code;
    }
  });

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

  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/js/*.{js,mjs,map}');
  eleventyConfig.addPassthroughCopy('src/assets/css/*.css');
  eleventyConfig.addPassthroughCopy('src/assets/images');
  eleventyConfig.addPassthroughCopy('src/*.{txt,ico,png}');

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
      slugify: slugify,
    })
    .use(markdownItFootnote)
    .use(markdownItTOCDoneRight, {
      containerClass: 'toc-container',
      slugify: slugify,
    });
  eleventyConfig.setLibrary('md', markdownLibrary);

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
