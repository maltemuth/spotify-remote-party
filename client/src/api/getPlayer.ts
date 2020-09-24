import sdkReady from './playerSDK';
import createSDKPlayer from './createSDKPlayer';
import { Player } from './Player';

let player: Player | null = null;

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
