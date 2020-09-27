import { Image } from './Image';

/**
 * API type stub for an album
 */
export interface Album {
  images: Image[];
  name: string;
  uri: string;
  href: string;
}
