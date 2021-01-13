const { DateTime } = require('luxon');
const fs = require('fs');
const path = require('path');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
// const pluginNavigation = require("@11ty/eleventy-navigation");
const emojiReadTime = require('@11tyrocks/eleventy-plugin-emoji-readtime');
const pluginEmoji = require('eleventy-plugin-emoji');
const pluginSitemap = require('@quasibit/eleventy-plugin-sitemap');
const pluginSchema = require('@quasibit/eleventy-plugin-schema');
const pluginExcerpt = require('eleventy-plugin-excerpt');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItTOC = require('markdown-it-table-of-contents');

const siteData = require('./src/_data/site.json');

const dir = {
  input: 'src',
  includes: '_includes',
  data: '_data',
  output: '_site',
};

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
  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  // eleventyConfig.addPlugin(pluginNavigation);
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

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  eleventyConfig.addNunjucksAsyncShortcode('icon', async function (icon, color) {
    const svg = await loadIcon(icon);

    return `<span class="icon" ${
      color ? `style="color: ${color}"` : ''
    } aria-hidden="true">${svg}</span>`;
  });

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
      'MMM dd, yyyy'
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

  eleventyConfig.addCollection('tagList', function (collection) {
    const tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ('tags' in item.data) {
        item.data.tags
          .filter((item) => {
            // this list should match the `filter` list in tag.njk
            return !['all', 'nav', 'post'].includes(item);
          })
          .forEach((tag) => {
            tagSet.add(tag);
          });
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/*.{txt,ico,png}');
  eleventyConfig.addPassthroughCopy('src/CNAME');

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: 'heading-link',
      permalinkSymbol: '<span class="sr-only">Permalink</span>#',
    })
    .use(markdownItFootnote)
    .use(markdownItTOC, {
      includeLevel: [2, 3],
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

  return {
    pathPrefix: '/',
    dir,
  };
};
