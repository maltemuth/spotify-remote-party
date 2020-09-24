import React, { useEffect, useRef, useState } from 'react';
import findTracks from '../../../api/findTracks';
import { Track } from '../../../api/Track';
import TrackInfo from '../TrackInfo/TrackInfo';

interface SongListProps {
  onTrackSelected?: (trackUri: string) => void;
}

const SongList: React.FunctionComponent<SongListProps> = ({
  onTrackSelected = () => {},
}) => {
  const searchInput = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (searchTerm.length > 3) {
      findTracks(searchTerm).then(setTracks);
    } else {
      setTracks([]);
    }
  }, [searchTerm]);

  return (
    <div className="SongList">
      <input
        type="search"
        className="SongList__search"
        placeholder="Search Song"
        ref={searchInput}
      />
      <button
        type="button"
        className="SongList__startSearch"
        onClick={() => {
          if (searchInput.current !== null) {
            setSearchTerm(searchInput.current!.value);
          }
        }}
      >
        Search
      </button>
      <ul className="SongList__trackList">
        {tracks.map(track => (
          <li key={track.uri} className="SongList__track">
            <button
              type="button"
              onClick={() => onTrackSelected(track.uri)}
              className="SongList__play"
            >
              play
            </button>
            <button
              type="button"
              onClick={() => onTrackSelected(track.uri)}
              className="SongList__queue"
              disabled
            >
              queue
            </button>
            <TrackInfo track={track} variant="flat" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
