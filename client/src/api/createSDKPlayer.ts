import { detectIdentity } from '../model/identity/detectIdentity';
import getToken from './getToken';
import { Player as SpotifyPlayer } from './Player';

// these types make the TS type annotation a little more readable,
// but serve no other purpose than to tell typescript what's going on.
type TokenCallback = (token: string) => void;
type PlayerConstructorOptions = {
  name: string;
  getOAuthToken: (callback: TokenCallback) => void;
};

/**
 * TS declaration for the globally-injected SDK
 */
declare namespace Spotify {
  class Player extends SpotifyPlayer {
    constructor(options: PlayerConstructorOptions);
  }
}

/**
 * creates a Spotify Web Playback SDK Player object,
 * and resolves with it once done.
 * @param name The name for the player - will show up in Spotify's device list
 */
const createSDKPlayer = (
  name = 'Remote Party Web Player'
): Promise<SpotifyPlayer> => {
  /* eslint-disable-next-line no-undef */
  const player = new Spotify.Player({
    name,
    getOAuthToken: callback =>
      getToken(detectIdentity()!).then(token => callback(token)),
  });

  // for better understanding during development, console.error any error message
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

  // playback status updates are also logged for better tracing
  player.addListener('player_state_changed', state => {
    console.log(state);
  });

  // again, log out when a device goes offline.
  // does this even trigger for devices beside the local player?
  /* eslint-disable-next-line camelcase */
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

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
