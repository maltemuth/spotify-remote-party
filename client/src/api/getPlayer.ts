import sdkReady from './sdkReady';
import createSDKPlayer from './createSDKPlayer';
import { Player } from './Player';

let player: Player | null = null;

/**
 * returns the global Player instance and creates it if needed
 */
const getPlayer = async (): Promise<Player> => {
  return new Promise(resolve => {
    if (!player) {
      sdkReady
        .then(() => createSDKPlayer())
        .then(newPlayer => {
          player = newPlayer;

          resolve(player);
        });
    } else {
      resolve(player!);
    }
  });
};

export default getPlayer;
