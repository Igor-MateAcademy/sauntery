import {LatLng} from './LatLng';

export interface Waypoint {
  id: String | Uint8Array;
  coordinate: LatLng | string;
}
