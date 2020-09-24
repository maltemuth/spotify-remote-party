import { Image } from './Image';

export interface Album {
  images: Image[];
  name: string;
  uri: string;
  href: string;
}
