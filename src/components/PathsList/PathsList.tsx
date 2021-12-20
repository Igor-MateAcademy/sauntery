import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {FlatList} from 'native-base';
import {ObservablePaths} from '../../Context';
import {RenderingPath} from '../RenderingPath/RenderingPath';

export const PathsList = observer(() => {
  const paths = useContext(ObservablePaths);

  const renderItemHandler = ({item}: any) => <RenderingPath path={item} />;

  const keyHandler = (item: any) => item.id;

  return (
    <FlatList
      data={paths.getPaths()}
      renderItem={renderItemHandler}
      keyExtractor={keyHandler}
    />
  );
});
