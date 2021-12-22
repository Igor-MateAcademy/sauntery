// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PathsData } = initSchema(schema);

export {
  PathsData
};