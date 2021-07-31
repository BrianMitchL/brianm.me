const isProduction = !/--serve/.test(process.argv.join(','));

module.exports = {
  isProduction,
  eleventyVersion: require('@11ty/eleventy/package.json').version,
  interVersion: require('@fontsource/inter/package.json').version,
  title: 'Brian Mitchell',
  description: 'Blog, projects, & online presence',
  url: isProduction ? 'https://brianm.me' : 'http://localhost:8080',
  author: {
    name: 'Brian Mitchell',
    bio: 'Senior Frontend Software Engineer and Web Developer, emoji lover 👋🏻, and an avid fan of electronic music.',
    twitter: 'BrianMitchL',
    instagram: 'BrianMitchL',
    image: '/assets/images/headshot-2021.jpg',
    web: 'https://brianm.me',
  },
  twitter: 'BrianMitchL',
  image: '/android-chrome-512x512.png',
  date: new Date(),
};
