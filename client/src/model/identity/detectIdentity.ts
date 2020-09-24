import { Identity } from 'spotify-remote-party-library/model/identity/Identity';

const IDENTITY_STORAGE_KEY = 'remote_party_identity';

const isIdentity = (candidate: any): candidate is Identity => {
  const { id, key } = candidate;
  return [id, key].every(variable => typeof variable === 'string');
};

const detectIdentity = (): Identity | null => {
  let identity: Identity;

  // first try: local storage
  const storedIdentity = localStorage.getItem(IDENTITY_STORAGE_KEY);
  if (typeof storedIdentity === 'string') {
    try {
      const identityFromLocalStorage = JSON.parse(storedIdentity);
      const { id, key } = identityFromLocalStorage;
      if (isIdentity({ id, key })) {
        identity = { id, key };
        return identity;
      }
    } catch (jsonParsingError) {
      /* eslint-disable-next-line no-console */
      console.error(jsonParsingError, 'Error parsing stored identity');
    }
  }

  // second try: URL params
  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const key = url.searchParams.get('key');
  const candidate = { id, key };
  if (isIdentity(candidate)) {
    identity = candidate;
    localStorage.setItem(IDENTITY_STORAGE_KEY, JSON.stringify(identity));
    // erase params so they cannot be copy-pasted by accident
    document.location.href = '/';
  }

  return null;
};

const deleteIdentity = () => {
  localStorage.removeItem(IDENTITY_STORAGE_KEY);
};

export { detectIdentity, deleteIdentity };
