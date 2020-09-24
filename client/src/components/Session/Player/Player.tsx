import React from 'react';
import { WebPlaybackState } from '../../../api/WebPlaybackState';
import TrackInfo from '../TrackInfo/TrackInfo';

interface PlayerProps {
  playbackState: WebPlaybackState | null;
  onPlay: () => void;
  onPause: () => void;
}

const Player: React.FunctionComponent<PlayerProps> = ({
  playbackState = null,
  onPlay,
  onPause,
}) => {
  const currentTrack = playbackState?.track_window.current_track;
  return (
    <div className="Player">
      <div className="Player__TrackInfo">
        <button
          className="Player__play"
          type="button"
          disabled={!playbackState || !playbackState.paused}
          onClick={onPlay}
        >
          play
        </button>
        <button
          className="Player__pause"
          type="button"
          disabled={!playbackState || playbackState.paused}
          onClick={onPause}
        >
          pause
        </button>
        {playbackState && <TrackInfo track={currentTrack!} />}
      </div>
      {playbackState && (
        <div className="Player__progress">
          <div
            className="Player__progressBar"
            style={{
              width: `${
                (100 * playbackState.position) / playbackState.duration
              }%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Player;
