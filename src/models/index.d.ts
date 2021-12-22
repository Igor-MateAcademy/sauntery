import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PathsDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PathsData {
  readonly id: string;
  readonly title: string;
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly isFavorite: boolean;
  readonly points: string;
  readonly region: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PathsData, PathsDataMetaData>);
  static copyOf(source: PathsData, mutator: (draft: MutableModel<PathsData, PathsDataMetaData>) => MutableModel<PathsData, PathsDataMetaData> | void): PathsData;
}