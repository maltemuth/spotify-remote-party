import { detectIdentity } from '../model/identity/detectIdentity';
import getToken from './getToken';
import { Track } from './Track';

const findTracks = (searchTerm: string): Promise<Track[]> =>
  getToken(detectIdentity()!)
    .then(token => {
      const url = new URL('https://api.spotify.com/v1/search');
      url.searchParams.append('q', searchTerm);
      url.searchParams.append('type', 'track');
      return fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    })
    .then(trackData => trackData.json())
    .then(data => data.tracks.items);

export default findTracks;
