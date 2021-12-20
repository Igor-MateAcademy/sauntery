import {makeAutoObservable} from 'mobx';

type LatLng = {
  latitude: Number;
  longitude: Number;
};

type Marker = {
  id: String | Uint8Array;
  coordinate: LatLng;
};

export class Markers {
  markers: any[] = [];
  geolocation: any = {};

  constructor() {
    makeAutoObservable(this);
  }

  addMarker = (marker: Marker): void => {
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
