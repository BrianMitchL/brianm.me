import LastFmArtists from './LastFmArtists.svelte';

var lastFmArtists = new LastFmArtists({
  target: document.getElementById('last-fm-artists-root'),
});

export default lastFmArtists;
