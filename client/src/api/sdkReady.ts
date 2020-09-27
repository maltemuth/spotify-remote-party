/**
 * lift the SDK ready event to a Promise
 */
const sdkReady = new Promise(resolve => {
  (window as any).onSpotifyWebPlaybackSDKReady! = () => {
    resolve();
  };
});

export default sdkReady;
