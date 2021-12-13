import React, {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Text, Box} from 'native-base';
// import {Path} from '../../types/Path';
import {ObservablePaths} from '../../ObservablePaths';

export const PathsList = observer(() => {
  const observablePaths = useContext(ObservablePaths);

  return (
    <Box>
      {observablePaths.paths.map(path => {
        <Text>{path.title}</Text>;
      })}
    </Box>
  );
});
