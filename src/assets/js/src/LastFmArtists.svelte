<script>
  let artistsPromise = getArtists('artists', '1month');

  async function getArtists(path, period = 'overall') {
    const res = await fetch(
      `https://lastfm-proxy.brianm.me/${path}?period=${period}`
    );
    if (res.ok && res.status === 200) {
      return res.json();
    }
    throw new Error('Bad request');
  }
</script>

{#await artistsPromise}
  <div class="loading"></div>
{:then data}
  <table>
    <caption>Top Artists - One Month</caption>
    <thead>
    <tr>
      <th>Name</th>
      <th>Playcount</th>
    </tr>
    </thead>
    <tbody>
    {#each data.topartists.artist as artist}
      <tr>
        <td><a href={artist.url} target="_blank" rel="noopener noreferrer">{artist.name}</a></td>
        <td>{Number(artist.playcount).toLocaleString()}</td>
      </tr>
    {/each}
    </tbody>
  </table>
{:catch error}
  <span>Error fetching top artists 😞</span>
{/await}
