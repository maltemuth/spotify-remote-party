const sdkReady = new Promise(resolve => {
  (window as any).onSpotifyWebPlaybackSDKReady! = () => {
    resolve();
  };
});

export default sdkReady;
