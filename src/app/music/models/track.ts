import { Artist } from './artist';
import { Image } from './image';
import { TrackWiki } from './track-wiki';

export interface Track {
  name: string;
  playcount: number;
  listeners: number;
  mbid: string;
  url: string;
  artist: Artist;
  image: Image;
  wiki: TrackWiki;
}
