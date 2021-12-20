import {makeAutoObservable} from 'mobx';
import {Waypoint} from '../types/Waypoint';
export class Markers {
  markers: Waypoint[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addMarker = (marker: Waypoint): void => {
    this.markers.push(marker);
  };

  isMarkersCountValid = () => {
    const count = this.markers.length;

    return count > 1 && count <= 10;
  };

  deleteAllMarkers = (): void => {
    this.markers = [];
  };

  getMarkers = () => this.markers;
}
