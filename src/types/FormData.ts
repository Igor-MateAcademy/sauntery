import {LatLng} from './LatLng';

export interface FormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  points?: LatLng[];
}
