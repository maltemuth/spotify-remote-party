import { deleteIdentity } from '../model/identity/detectIdentity';

const logout = () => {
  deleteIdentity();
  document.location.reload();
};

export default logout;
