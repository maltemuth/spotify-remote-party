import { Identity } from 'spotify-remote-party-library/model/identity/Identity';
import { BACKEND_URL } from '../constants';
import logout from './logout';

/**
 * retrieves the Spotify API OAuth access token for the local identity;
 * if this does not work, treat it as session timeout and logout the local identity
 */
const getToken = ({ id, key }: Identity): Promise<string> =>
  fetch(`${BACKEND_URL}/token/${id}/${key}`)
    .then(data => data.json())
    .then(data => data.token)
    .catch(logout);

export default getToken;
