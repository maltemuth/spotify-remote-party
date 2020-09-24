import { Album } from './Album';
import { Artist } from './Artist';

export interface WebPlaybackTrack {
  uri: string;
  id: string | null;
  type: 'track' | 'episode' | 'ad';
  /* eslint-disable-next-line camelcase */
  media_type: 'audio' | 'video';
  name: string;
  /* eslint-disable-next-line camelcase */
  is_playable: boolean;
  album: Album;
  artists: Artist[];
}
