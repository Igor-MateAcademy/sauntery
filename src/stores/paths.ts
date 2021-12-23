import {makeObservable, observable, action, computed} from 'mobx';
import {Path} from '../types/Path';
import {DataStore} from 'aws-amplify';
import {PathsData} from '../models';
export class Paths {
  paths: Path[] = [];

  constructor() {
    makeObservable(this, {
      paths: observable,
      deletePath: action,
      getPaths: computed,
      setPathsFromDataStore: action,
      updatePathsFromDataStore: action,
    });
  }

  async addPath(path: Path) {
    let dataFromDataStore;

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

    dataFromDataStore = await this.getPathsFromDataStore();

    if (dataFromDataStore) {
      const lastItem = dataFromDataStore[dataFromDataStore.length - 1];

      this.paths.push({
        id: lastItem.id,
        ...path,
      });
    } else {
      console.log('Data from storage is invalid');
    }
  }

  async deletePath(id: string) {
    await DataStore.delete(PathsData, id);

    await this.setPathsFromDataStore();
  }

  get getPaths() {
    return this.paths;
  }

  private async getPathsFromDataStore() {
    try {
      const fromDataStore = await DataStore.query(PathsData);

      return fromDataStore;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async setPathsFromDataStore() {
    const downloadedData = await this.getPathsFromDataStore();

    if (downloadedData) {
      downloadedData.sort(
        (a: PathsData, b: PathsData) =>
          Number(b.isFavorite) - Number(a.isFavorite),
      );
    }

    this.paths = downloadedData as unknown as Path[];
  }

  async updatePathsFromDataStore(id: string) {
    const originalPath = await DataStore.query(PathsData, id);

    if (originalPath) {
      await DataStore.save(
        PathsData.copyOf(originalPath, updatedPath => {
          updatedPath.isFavorite = !originalPath.isFavorite;
        }),
      );
    }

    await this.setPathsFromDataStore();
  }
}
