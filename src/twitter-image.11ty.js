class OpenGraphImage {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      pagination: {
        data: 'collections.all',
        size: 1,
        alias: 'item',
      },
      tags: [],
      layout: 'layouts/svgAsPng',
      permalink: ({ item }) => {
        return `${item.url}/twitter.png`;
      },
    };
  }

  // thanks Zac - https://github.com/zapplebee/personal-blog/blob/5ed063b8a9976a29a6ce990859aae52e52ef7ec3/site/og-image.11ty.js#L24
  *splitLines(text) {
    const words = text.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i += 1) {
      const possibleLine = (line + ' ' + words[i]).trim();
      if (possibleLine.length > 18) {
        yield line;
        line = words[i];
      } else {
        line = possibleLine;
      }
    }
    yield line;
  }

  async render(data) {
    let nameDate = data.site.author.name;

    if (data.item.data.tags?.includes('post')) {
      nameDate += ` – ${data.item.date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }

    let splitTitle = [];
    if (data?.item?.data?.title) {
      splitTitle = [...this.splitLines(data.item.data.title)];
    }

    const image = data.item?.data?.image ?? data.site.author.image;
    const base64Image = await this.imageBase64(image);

    return `
<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      {% include "inter-medium-500-base64.css" %}
      text {
        font-family: "Inter Medium";
        font-weight: 500;
      }
    </style>
    <linearGradient id="gradient" gradientTransform="rotate(5)">
      <stop offset="0%" stop-color="#ff5c00" />
      <stop offset="33%" stop-color="#ff0050" />
      <stop offset="66%" stop-color="#e800ff" />
      <stop offset="100%" stop-color="#00a1ff" />
    </linearGradient>
    <clipPath id="rrect" clipPathUnits="objectBoundingBox">
      <rect width="1" height="1" rx="0.1" />
    </clipPath>
  </defs>
  <rect x="0" y="0" height="300" width="600" fill="#18181b"></rect>
  <rect x="0" y="270" height="30" width="600" fill="url(#gradient)"></rect>
  <text x="30" y="55" font-size="25" fill="#a1a1aa" id="site-title">${nameDate}</text>
  <image x="370" y="30" width="200" height="200" id="image" xlink:href="${base64Image}" clip-path="url(#rrect)" />
  <use xlink:href="#path1" x="0" y="35" stroke="blue" stroke-width="1" />
  <text font-size="35" fill="white" id="page-title" transform="translate(30 105)">
    ${splitTitle
      .map((line, idx) => `<tspan x="0" y="${idx * 40}">${line}</tspan>`)
      .join('')}
  </text>
</svg>
`.trim();
  }
}

module.exports = OpenGraphImage;
