import getPlayer from '../getPlayer';

/**
 * starts local playback of the given spotify track uri
 * the returned promise resolves when playback has started, but contains no other info
 * @param uri
 */
const play = async (uri: string): Promise<void> => {
  const {
    _options: { id, getOAuthToken },
  } = await getPlayer();
  getOAuthToken(token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  });
};

export default play;
