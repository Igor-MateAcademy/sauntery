import React from 'react';
import {Text} from 'native-base';
import {FormData} from '../types/FormData';

export const PathsList = ({route}: any) => {
  const {paths} = route.params;

  return paths.map((path: FormData) => <Text>{path.title}</Text>);
};
