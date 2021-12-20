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
import {ObservablePaths} from '../../Context';
import {observer} from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/Entypo';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const API_KEY = 'AIzaSyBtTK6KMu2bzUP3l80MhMdkPmsQF_6Zg7M';

export const RenderingPath: React.FC<any> = observer(({path}) => {
  const paths = useContext(ObservablePaths);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [distanceBetweenMarkers, setDistanceBetweenMarkers] = useState(0);

  const deleteFromList = () => {
    paths.deletePath(path.id);
  };

  const getPathInfo = () => {
    setIsModalVisible(true);
  };

  const setAsFavorite = () => {
    paths.sortByFavorite(path.id);
  };

  const getFirstWaypoint = () => path.points[0].coordinate;

  const getLastWaypoint = () => path.points[path.points.length - 1].coordinate;

  const getWaypoints = () => {
    const waypoints = path.points.slice(1, -1);

    if (waypoints.length < 1) {
      return undefined;
    }

    return waypoints.map((way: any) => way.coordinate);
  };

  const getDistance = (result: any) => {
    setDistanceBetweenMarkers(result.distance);
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
          size="100%"
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
              <Divider style={styles.modal__divider} />
              <MapView
                showsUserLocation={true}
                style={styles.map}
                region={path.region}>
                {path.points.map((marker: any) => (
                  <Marker coordinate={{...marker.coordinate}} key={marker.id} />
                ))}
                <MapViewDirections
                  origin={getFirstWaypoint()}
                  waypoints={getWaypoints()}
                  destination={getLastWaypoint()}
                  apikey={API_KEY}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  mode="WALKING"
                  onReady={getDistance}
                />
              </MapView>
              <Heading
                style={
                  styles.distance
                }>{`Distance: ${distanceBetweenMarkers} km`}</Heading>
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

  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modal__divider: {
    marginVertical: 12,
  },

  modal__header: {
    marginBottom: 8,
  },

  map: {
    marginBottom: 8,
    height: '100%',
    width: 350,
  },

  distance: {
    textAlign: 'center',
  },
});