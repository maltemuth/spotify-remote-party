import { Identity } from 'spotify-remote-party-library/model/identity/Identity';
import { BACKEND_URL } from '../constants';
import logout from './logout';

const getToken = ({ id, key }: Identity): Promise<string> =>
  fetch(`${BACKEND_URL}/token/${id}/${key}`)
    .then(data => data.json())
    .then(data => data.token)
    .catch(logout);

export default getToken;
