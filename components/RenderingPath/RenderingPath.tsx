import React from 'react';
import {Box, Heading, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export const RenderingPath: React.FC<any> = ({path}) => {
  return (
    <Box style={styles.path}>
      <Heading>{path.title}</Heading>
      <Text style={styles.path__text} isTruncated>
        {path.shortDescription}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  path: {
    marginTop: 8,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1e9bf9',
  },

  path__text: {
    color: '#919191',
  },
});
