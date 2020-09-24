import getPlayer from '../getPlayer';

const stop = async () => {
  const player = await getPlayer();
  return player.pause();
};

export default stop;
