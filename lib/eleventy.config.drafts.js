// shoutout to https://github.com/11ty/eleventy-base-blog/blob/3b5baa5bfc424c8eab8a8fed5ccb7f556d112b68/eleventy.config.drafts.js
function eleventyComputedPermalink() {
  // When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
  // `addGlobalData` acts like a global data file and runs the top level function it receives.
  return (data) => {
    // Always skip during non-watch/serve builds
    if (data.draft && !process.env.BUILD_DRAFTS) {
      return false;
    }

    return data.permalink;
  };
}

function eleventyComputedExcludeFromCollections() {
  // When using `addGlobalData` and you *want* to return a function, you must nest functions like this.
  // `addGlobalData` acts like a global data file and runs the top level function it receives.
  return (data) => {
    // Always exclude from non-watch/serve builds
    if (data.draft && !process.env.BUILD_DRAFTS) {
      return true;
    }

    return data.eleventyExcludeFromCollections;
  };
}

module.exports.eleventyComputedPermalink = eleventyComputedPermalink;
module.exports.eleventyComputedExcludeFromCollections =
  eleventyComputedExcludeFromCollections;

module.exports = (eleventyConfig) => {
  eleventyConfig.addGlobalData(
    'eleventyComputed.permalink',
    eleventyComputedPermalink,
  );
  eleventyConfig.addGlobalData(
    'eleventyComputed.eleventyExcludeFromCollections',
    eleventyComputedExcludeFromCollections,
  );

  let logged = false;
  eleventyConfig.on('eleventy.before', ({ runMode }) => {
    const isDev = runMode === 'serve' || runMode === 'watch';

    // Only show drafts in serve/watch modes
    if (isDev) {
      process.env.BUILD_DRAFTS = 'true';
    }

    // Only log once.
    if (!logged) {
      console.log(`[brianm.me] ${isDev ? 'Including' : 'Excluding'} drafts.`);
    }

    logged = true;
  });
};
