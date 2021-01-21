const { isProduction } = require('../../_data/site');

const data = {
  eleventyExcludeFromCollections: isProduction,
  tags: ['draft']
};

if (isProduction) {
  data.permalink = false;
}

module.exports = data;
