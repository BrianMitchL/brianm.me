const Cache = require('@11ty/eleventy-fetch');
const { DateTime } = require('luxon');
const yaml = require('js-yaml');

const headers = {};
if (process.env.GH_PAT) {
  headers.Authorization = `Basic ${btoa(`BrianMitchL:${process.env.GH_PAT}`)}`;
} else {
  console.warn('no GH_PAT env variable set');
}

module.exports = async function () {
  const linguistYaml = await Cache(
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml',
    {
      duration: '1d',
      type: 'text',
      fetchOptions: {
        headers,
      },
    },
  );

  const linguist = yaml.load(linguistYaml);

  const languageColors = Object.entries(linguist).reduce(
    (acc, [key, value]) => {
      if (value.color) {
        acc[key] = value.color;
      }
      return acc;
    },
    {},
  );

  const reposRaw = await Cache(
    'https://api.github.com/users/BrianMitchL/repos?type=owner&per_page=100&sort=pushed',
    {
      duration: '1d',
      type: 'json',
      fetchOptions: {
        headers,
      },
    },
  );

  const formatNumber = (num) =>
    Math.abs(num) > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();

  // thanks https://thekevinscott.com/emojis-in-javascript/
  const startsWithEmoji =
    /^[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff]/;

  const now = DateTime.now();

  const repos = reposRaw
    .filter((repo) => {
      // skip forks, private repos, archived repos, and repos with no description
      if (repo.fork || repo.private || repo.archived || !repo.description) {
        return false;
      }
      // only show repos that have been pushed to in the last 4 years
      return (
        now.diff(DateTime.fromISO(repo.pushed_at), 'years').toObject().years <=
        4
      );
    })
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      pushed_at: new Date(repo.pushed_at),
      forks_count: formatNumber(repo.forks_count),
      forks_url: `${repo.html_url}/network/members`,
      stargazers_count: formatNumber(repo.stargazers_count),
      stargazers_url: `${repo.html_url}/stargazers`,
      language: repo.language,
      language_color: languageColors[repo.language] ?? 'transparent',
    }))
    .sort((a, b) => {
      // emoji starting the description is a secret way to feature a repo
      const aEmoji = startsWithEmoji.test(a?.description ?? '');
      const bEmoji = startsWithEmoji.test(b?.description ?? '');
      if (aEmoji && !bEmoji) return -1;
      if (!aEmoji && bEmoji) return 1;
      // otherwise just alphabetize it
      return a.name.localeCompare(b.name);
    });

  return {
    repos,
  };
};
