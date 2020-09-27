import getPlayer from '../getPlayer';

/**
 * stops the current playback
 * resolves when playback has stopped, but does not resolve with any info
 */
const stop = async () => {
  const player = await getPlayer();
  return player.pause();
};

export default stop;
