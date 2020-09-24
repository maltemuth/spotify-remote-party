import getPlayer from '../getPlayer';

const play = async (uri: string) => {
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
