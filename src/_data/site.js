const runMode = process.env.ELEVENTY_RUN_MODE;
const isProduction = runMode === 'build';

console.log(
  `[brianm.me] Running in ${isProduction ? 'production' : 'development'} mode.`,
);

module.exports = {
  isProduction,
  title: 'Brian Mitchell',
  description: 'Blog, projects, & online presence',
  url: isProduction ? 'https://brianm.me' : 'http://localhost:8080',
  author: {
    name: 'Brian Mitchell',
    bio: 'Senior Frontend Software Engineer and Web Developer, emoji lover 👋🏻, and an avid fan of electronic music.',
    bluesky: 'https://bsky.app/profile/brianmitchl.com',
    instagram: 'https://instagram.com/BrianMitchL',
    mastodon: 'https://mspsocial.net/@BrianMitchL',
    image: '/assets/images/headshot-2025.jpg',
    imageHeight: '1024',
    imageWidth: '1024',
    web: 'https://brianm.me',
  },
  short_name: 'BrianMitchL',
  image: '/android-chrome-512x512.png',
  date: new Date(),
};
