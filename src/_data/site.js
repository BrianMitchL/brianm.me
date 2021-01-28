const isProduction = !/--serve/.test(process.argv.join(','));

module.exports = {
  isProduction,
  eleventyVersion: require('@11ty/eleventy/package.json').version,
  analytics: {
    google: {
      tracking_id: 'UA-44772557-2',
    },
  },
  title: 'Brian Mitchell',
  description: 'Blog, projects, & online presence',
  url: isProduction ? 'https://brianm.me' : 'http://localhost:8080',
  author: 'Brian Mitchell',
  twitter: 'BrianMitchL',
  image: '/android-chrome-512x512.png',
  google_site_verification: '4-mwXA7aYqZalRm3UuWpPv-aMyFT_zUtA_ks_RK7r5I',
};
