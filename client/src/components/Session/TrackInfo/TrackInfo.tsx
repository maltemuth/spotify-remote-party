import React from 'react';
import { Track } from '../../../api/Track';
import { WebPlaybackTrack } from '../../../api/WebPlaybackTrack';

interface TrackInfoProps {
  track: WebPlaybackTrack | Track;
  variant?: 'default' | 'flat';
}

const TrackInfo: React.FunctionComponent<TrackInfoProps> = ({
  track,
  variant = 'default',
}) => (
  <div className={`TrackInfo TrackInfo--${variant}`}>
    <img
      src={track.album.images[0]?.url}
      alt={track.album.name}
      className="TrackInfo__image"
    />
    <div className="TrackInfo__info">
      <div className="TrackInfo__artist">
        {track.artists.map(artist => artist.name).join(', ')}
      </div>
      <div className="TrackInfo__track">{track.name}</div>
      <div className="TrackInfo__album">{track.album.name}</div>
    </div>
  </div>
);

export default TrackInfo;
