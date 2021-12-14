import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {FlatList} from 'native-base';
import {ObservablePaths} from '../../ObservablePaths';
import {RenderingPath} from '../RenderingPath/RenderingPath';

export const PathsList = observer(() => {
  const observablePaths = useContext(ObservablePaths);

  return (
    <FlatList
      data={observablePaths.paths}
      renderItem={({item}: any) => <RenderingPath path={item} />}
      keyExtractor={() => String(Math.random())}
    />
  );
});
