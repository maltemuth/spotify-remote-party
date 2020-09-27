import { deleteIdentity } from '../model/identity/detectIdentity';

/**
 * cleans up the local session, and reloads the app
 */
const logout = () => {
  deleteIdentity();
  document.location.reload();
};

export default logout;
