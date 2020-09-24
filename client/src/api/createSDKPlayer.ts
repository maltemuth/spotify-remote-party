import { detectIdentity } from '../model/identity/detectIdentity';
import getToken from './getToken';
import { Player as SpotifyPlayer } from './Player';

type TokenCallback = (token: string) => void;
type PlayerConstructorOptions = {
  name: string;
  getOAuthToken: (callback: TokenCallback) => void;
};

declare namespace Spotify {
  class Player extends SpotifyPlayer {
    constructor(options: PlayerConstructorOptions);
  }
}

const createSDKPlayer = (
  name = 'Remote Party Web Player'
): Promise<SpotifyPlayer> => {
  /* eslint-disable-next-line no-undef */
  const player = new Spotify.Player({
    name,
    getOAuthToken: callback =>
      getToken(detectIdentity()!).then(token => callback(token)),
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    console.log(state);
  });

  // Not Ready
  /* eslint-disable-next-line camelcase */
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

  return new Promise(resolve => {
    /* eslint-disable-next-line camelcase */
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      resolve(player);
    });
  });
};

export default createSDKPlayer;
