import {makeObservable, observable, action, computed} from 'mobx';
import {Waypoint} from '../types/Waypoint';

export class Markers {
  markers: Waypoint[] = [];

  constructor() {
    makeObservable(this, {
      markers: observable,
      addMarker: action,
      deleteAllMarkers: action,
      isMarkersCountValid: computed,
      getMarkers: computed,
    });
  }

  addMarker(marker: Waypoint) {
    this.markers.push(marker);
  }

  get isMarkersCountValid() {
    const length = this.markers.length;

    return length > 1 && length <= 10;
  }

  deleteAllMarkers() {
    this.markers = [];
  }

  get getMarkers() {
    return this.markers;
  }
}
