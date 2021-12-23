import {makeAutoObservable} from 'mobx';
import {Path} from '../types/Path';
import {DataStore, Predicates} from 'aws-amplify';
import {PathsData} from '../models';
export class Paths {
  paths: Path[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addPath = async (path: Path) => {
    await DataStore.save(
      new PathsData({
        title: path.title,
        shortDescription: path.shortDescription,
        fullDescription: path.fullDescription,
        isFavorite: path.isFavorite,
        points: JSON.stringify(path.points),
        region: JSON.stringify(path.region),
      }),
    );

    const dataFromDataStore = await this.getPathsFromDataStore();
    if (dataFromDataStore) {
      const lastItem = dataFromDataStore[dataFromDataStore.length - 1];

      this.paths.push({
        id: lastItem.id,
        ...path,
      });
    } else {
      console.log('Data from storage is invalid');
    }
  };

  deletePath = async (id: string) => {
    await DataStore.delete(PathsData, id);

    this.setPathsFromDataStore();
  };

  sortByFavorite = () => {
    this.paths.sort(
      (a: Path, b: Path) => Number(b.isFavorite) - Number(a.isFavorite),
    );
  };

  getPaths = () => this.paths;

  getPathsFromDataStore = async () => {
    try {
      const fromDataStore = await DataStore.query(PathsData);

      return fromDataStore;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  setPathsFromDataStore = async () => {
    const downloadedData = await this.getPathsFromDataStore();

    if (downloadedData) {
      downloadedData.sort(
        (a: PathsData, b: PathsData) =>
          Number(b.isFavorite) - Number(a.isFavorite),
      );
    }

    this.paths = downloadedData as unknown as Path[];
  };

  updatePathsFromDataStore = async (id: string) => {
    const originalPath = await DataStore.query(PathsData, id);

    if (originalPath) {
      await DataStore.save(
        PathsData.copyOf(originalPath, updatedPath => {
          updatedPath.isFavorite = !originalPath.isFavorite;
        }),
      );
    }

    await this.setPathsFromDataStore();
  };

  ////* Utility methods *////

  showDataStore = async () => {
    try {
      const dataFromDataStore = await DataStore.query(PathsData);

      console.log('Data from storage', dataFromDataStore);
    } catch (error) {
      console.log('Error from showDataStore', error);
    }
  };

  clearDataStore = async () => {
    await DataStore.delete(PathsData, Predicates.ALL);
  };
}
