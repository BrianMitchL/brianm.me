module.exports = {
  meta: {
    site: {
      name: (data) => data.site.title,
      description: (data) => data.site.description,
      url: (data) => data.site.url,
      logo: {
        src: (data) => data.site.url + data.site.image,
        height: (data) => data.site.imageHeight,
        width: (data) => data.site.imageWidth,
      },
    },
    language: 'en-US',
    url: (data) => data.site.url + data.page.url,
    title: (data) => {
      // dependencies
      data.title;
      data.site.title;

      return data.title ?? data.site.title;
    },
    description: (data) => {
      // dependencies
      data.description;
      data.site.description;

      return data.description ?? data.site.description;
    },
    image: {
      src: (data) => {
        // dependencies
        data.image;
        data.site.url;
        data.site.image;

        if (data.image) {
          return `${data.image.startsWith('http') ? '' : data.site.url}${
            data.image
          }`;
        }
        return data.site.url + data.site.image;
      },
    },
    author: {
      name: (data) => data.site.author.name,
    },
    published: (data) => data.page.date.toISOString(),
    modified: (data) => data.modified?.toISOString() ?? null,
  },
};
