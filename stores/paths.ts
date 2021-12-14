import {makeAutoObservable} from 'mobx';
import {Path} from '../types/Path';

export class Paths {
  paths: Path[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPath = (path: Path): void => {
    this.paths.push({...path});
  };
}
