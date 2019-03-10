import { Artist } from './artist';
import { Image } from './image';

export interface Track {
  name: string;
  playcount: number;
  listeners: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image;
}
