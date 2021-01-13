module.exports = {
  eleventyExcludeFromCollections: process.env.ELEVENTY_ENV === 'production',
  tags: ['draft']
};
