import {makeAutoObservable, toJS} from 'mobx';

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

  constructor() {
    makeAutoObservable(this);
  }

  addMarker = (marker: Marker): void => {
    console.log('marker', marker);
    this.markers.push(marker);
    console.log('markers', toJS(this.markers));
  };

  getMarkers = () => this.markers;
}
