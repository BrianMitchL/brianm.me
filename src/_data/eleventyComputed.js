module.exports = {
  postDate: (data) => {
    return data.tags?.includes('post') ? data.page.date : null;
  },
  pageImage: (data) => {
    return data.image ?? data.site.author.image;
  },
};
