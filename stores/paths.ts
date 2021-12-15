import _ from 'lodash';
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

  sortByFavorite = (id: string | Uint8Array) => {
    const pathsWithoutFavorite = this.paths.filter(path => id !== path.id);
    const favoritePath = this.paths.find(path => path.id === id);
    const deepClone = _.cloneDeep(favoritePath);

    if (deepClone) {
      deepClone.isFavorite = !deepClone.isFavorite;
      pathsWithoutFavorite.push(deepClone);
      this.paths = pathsWithoutFavorite;
      this.paths.sort((a: any, b: any) => b.isFavorite - a.isFavorite);
    }
  };
}
