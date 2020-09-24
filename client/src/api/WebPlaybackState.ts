import { WebPlaybackTrack } from './WebPlaybackTrack';

export interface WebPlaybackState {
  context: {
    uri: string | null;
    metadata: object | null;
  };
  disallows: {
    pausing?: boolean;
    /* eslint-disable-next-line camelcase */
    peeking_next?: boolean;
    /* eslint-disable-next-line camelcase */
    peeking_prev?: boolean;
    resuming?: boolean;
    seeking?: boolean;
    /* eslint-disable-next-line camelcase */
    skipping_next?: boolean;
    /* eslint-disable-next-line camelcase */
    skipping_prev?: boolean;
  };
  paused: boolean;
  position: number;
  duration: number;
  /* eslint-disable-next-line camelcase */
  repeat_mode: 0 | 1 | 2;
  shuffle: boolean;
  /* eslint-disable-next-line camelcase */
  track_window: {
    /* eslint-disable-next-line camelcase */
    current_track: WebPlaybackTrack;
    /* eslint-disable-next-line camelcase */
    previous_tracks: WebPlaybackTrack[];
    /* eslint-disable-next-line camelcase */
    next_tracks: WebPlaybackTrack[];
  };
}
