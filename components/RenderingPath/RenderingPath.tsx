import React, {useContext, useState} from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Modal,
  Divider,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {ObservablePaths} from '../../ObservablePaths';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/Entypo';

export const RenderingPath: React.FC<any> = observer(({path}) => {
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
        <Heading>{path.title}</Heading>
        <Text style={styles.path__description} isTruncated maxWidth="90%">
          {path.shortDescription}
        </Text>
      </Flex>
      <Box>
        <IconButton
          icon={<Icon name="squared-cross" size={20} color="#919191" />}
          onPress={deleteFromList}
        />
        <IconButton
          icon={
            path.isFavorite ? (
              <Icon name="heart" size={20} color="#ff0f60" />
            ) : (
              <Icon name="heart-outlined" size={20} color="#ff0f60" />
            )
          }
          onPress={setAsFavorite}
        />
        <IconButton
          icon={<Icon name="info" size={20} color="#ffd966" />}
          onPress={getPathInfo}
        />
        <Modal
          isOpen={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>{path.title}</Modal.Header>
            <Modal.Body>
              <Heading style={styles.modal__header}>Short description</Heading>
              <Text style={styles.path__description}>
                {path.shortDescription}
              </Text>
              <Divider style={styles.modal__divider} />
              <Heading style={styles.modal__header}>Full description</Heading>
              <Text style={styles.path__description}>
                {path.fullDescription}
              </Text>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </Box>
    </Flex>
  );
});

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

  modal__header: {
    marginBottom: 8,
  },
});
