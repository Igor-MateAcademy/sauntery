import {LatLng} from './LatLng';
import {Region} from './Region';

export interface Path {
  id?: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  isFavorite: boolean;
  points: LatLng[];
  region: Region;
}
