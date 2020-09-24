import { Identity } from 'spotify-remote-party-library/model/identity/Identity';
import getToken from './getToken';
import { Profile } from './Profile';

const getProfile = (identity: Identity): Promise<Profile> =>
  getToken(identity)
    .then(token =>
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
    .then(data => data.json())
    .then(
      /* eslint-disable-next-line camelcase */
      ({ display_name, images }) =>
        ({ name: display_name, image: images[0] || null } as Profile)
    );

export default getProfile;
