import { Album } from './Album';
import { Artist } from './Artist';

export interface Track {
  name: string;
  album: Album;
  artists: Artist[];
  href: string;
  uri: string;
}
