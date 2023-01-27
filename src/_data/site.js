const isProduction = !/--serve/.test(process.argv.join(','));

module.exports = {
  isProduction,
  title: 'Brian Mitchell',
  description: 'Blog, projects, & online presence',
  url: isProduction ? 'https://brianm.me' : 'http://localhost:8080',
  author: {
    name: 'Brian Mitchell',
    bio: 'Senior Frontend Software Engineer and Web Developer, emoji lover 👋🏻, and an avid fan of electronic music.',
    twitter: 'BrianMitchL',
    instagram: 'BrianMitchL',
    mastodon: 'https://mspsocial.net/@BrianMitchL',
    image: '/assets/images/headshot-2022.jpg',
    imageHeight: '1024',
    imageWidth: '1024',
    web: 'https://brianm.me',
  },
  twitter: 'BrianMitchL',
  image: '/android-chrome-512x512.png',
  date: new Date(),
};
