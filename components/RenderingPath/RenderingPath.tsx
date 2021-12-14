import React, {useContext, useState} from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  CloseIcon,
  InfoIcon,
  MoonIcon,
  Modal,
  Divider,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {ObservablePaths} from '../../ObservablePaths';

export const RenderingPath: React.FC<any> = ({path}) => {
  const observablePaths = useContext(ObservablePaths);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteFromList = () => {
    observablePaths.deletePath(path.id);
  };

  const getPathInfo = () => {
    setIsModalVisible(true);
  };

  const setAsFavorite = () => {
    observablePaths.sortByFavorite(path.id);
  };

  return (
    <Flex style={styles.path}>
      <Flex style={styles.path__info}>
        <Heading>
          {path.title}
          {path.isFavorite ? 'Favirote' : 'No'}
        </Heading>
        <Text style={styles.path__description} isTruncated maxWidth="90%">
          {path.shortDescription}
        </Text>
      </Flex>
      <Box>
        <IconButton icon={<CloseIcon size="3" />} onPress={deleteFromList} />
        <IconButton icon={<MoonIcon size="3" />} onPress={setAsFavorite} />
        <IconButton icon={<InfoIcon size="3" />} onPress={getPathInfo} />
        <Modal
          isOpen={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>{path.title}</Modal.Header>
            <Modal.Body>
              <Heading>Short description</Heading>
              <Text>{path.shortDescription}</Text>
              <Divider style={styles.modal__divider} />
              <Heading>Full description</Heading>
              <Text>{path.fullDescription}</Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </Flex>
  );
};

const styles = StyleSheet.create({
  path: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginHorizontal: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#1e9bf9',
  },

  path__info: {
    justifyContent: 'space-evenly',
  },

  path__description: {
    fontSize: 16,
    color: '#919191',
  },

  modal__divider: {
    marginVertical: 12,
  },
});
