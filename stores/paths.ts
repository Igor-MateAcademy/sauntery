import {makeAutoObservable} from 'mobx';
import {Path} from '../types/Path';

export class Paths {
  paths: Path[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPath = (path: Path): void => {
    this.paths.push(path);
  };

  deletePath = (id: string | Uint8Array): void => {
    this.paths = this.paths.filter(path => id != path.id);
  };
  // rewrite this method
  sortByFavorite = (id: string | Uint8Array) => {
    const favoritePath = this.paths.find(path => path.id === id);
    console.log(favoritePath);
    debugger;
    this.paths.sort((a: any, b: any) => a.isFavorite - b.isFavorite);
  };
}
