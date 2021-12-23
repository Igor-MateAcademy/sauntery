/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useRef, useState, useEffect} from 'react';
import {
  Heading,
  Box,
  Button,
  Flex,
  Divider,
  Text,
  Alert,
  HStack,
  IconButton,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {ObservableMarkers, ObservablePaths} from '../../Context';
import {observer} from 'mobx-react-lite';
import Geolocation from '@react-native-community/geolocation';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import uuid from 'react-native-uuid';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Entypo';
import {Region} from '../../types/Region';
import {GOOGLE_API_KEY} from '@env';

export const Home = observer(({navigation}: any) => {
  const marker = useContext(ObservableMarkers);
  const paths = useContext(ObservablePaths);
  const map = useRef<MapView>();

  const navigateToForm = () => {
    if (marker.isMarkersCountValid()) {
      navigation.navigate('Form', {
        points: [...marker.getMarkers()],
        region: {...region},
      });
    }
  };

  const navigateToPathsList = () => {
    navigation.navigate('List');
  };

  const [currentPosition, setCurrentPosition] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
    error: '',
  });

  const [isDirection, setIsDirection] = useState(true);

  const options = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 2000,
  };

  const success = (position: any) => {
    const {latitude, longitude} = position.coords;

    setCurrentPosition({
      ...currentPosition,
      latitude: latitude,
      longitude: longitude,
    });

    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
    });
  };

  const error = (error: any) => {
    setCurrentPosition({
      ...currentPosition,
      error: error.message,
    });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(success, error, options);
    paths.setPathsFromDataStore();
  }, []);

  const [region, setRegion] = useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const handleTouch = (event: MapEvent): void => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newMarker = {
      id: uuid.v1(),
      coordinate: {
        latitude: latitude,
        longitude: longitude,
      },
    };

    marker.addMarker({
      ...newMarker,
    });
  };

  const moveToGeolocation = () => {
    map.current?.animateCamera(
      {
        center: {...currentPosition},
      },
      {
        duration: 1000,
      },
    );
  };

  const handleRegionChange = (coords: any) => {
    const {latitude, longitude, longitudeDelta, latitudeDelta} = coords;

    setRegion({
      ...region,
      latitude: latitude,
      longitude: longitude,
      longitudeDelta: longitudeDelta,
      latitudeDelta: latitudeDelta,
    });
  };

  const clearAllMarkers = (): void => {
    marker.deleteAllMarkers();
    setIsDirection(false);
  };

  const getFirstWaypoint = () => {
    if (marker.getMarkers().length > 1) {
      const waypoint = marker.getMarkers()[0];

      return waypoint.coordinate;
    }
  };

  const getLastWaypoint = () => {
    if (marker.getMarkers().length > 1) {
      const waypoint = marker.getMarkers()[marker.getMarkers().length - 1];

      return waypoint.coordinate;
    }
  };

  const handleRenderingDirection = () => {
    setIsDirection(!isDirection);
  };

  const getWaypoints = () => {
    const markers = marker.getMarkers();
    const slicedMarkers = markers.slice(1, -1);

    if (markers.length < 1) {
      return undefined;
    }

    return slicedMarkers.map(way => way.coordinate);
  };

  return (
    <Box style={styles.page}>
      <Heading style={styles.page__title}>Saunter</Heading>
      <Divider style={styles.divider} />
      <Flex style={styles.nav}>
        <Button style={styles.nav__button} onPress={navigateToForm}>
          <Text style={styles['nav__button-text']}>Add path</Text>
        </Button>
        <Button style={styles.nav__button} onPress={navigateToPathsList}>
          <Text style={styles['nav__button-text']}>Show paths</Text>
        </Button>
      </Flex>
      <Divider style={styles.divider} />
      {!marker.isMarkersCountValid() ? (
        <Alert status="info" variant="outline" style={styles.alert}>
          <HStack space={3} alignItems="center">
            <Alert.Icon />
            <Text style={styles.alert__text}>
              Select as minimum 2 waypoints, but less than 10
            </Text>
          </HStack>
        </Alert>
      ) : (
        <Alert status="success" variant="outline" style={styles.alert}>
          <HStack space={3} alignItems="center">
            <Alert.Icon />
            <Text style={styles.alert__text}>You can add path now!</Text>
          </HStack>
        </Alert>
      )}
      <Box style={styles.map__container}>
        <MapView
          showsUserLocation={true}
          ref={(ref: any) => {
            map.current = ref;
          }}
          style={styles.map}
          region={region}
          onRegionChangeComplete={handleRegionChange}
          onPress={handleTouch}>
          {marker.markers.map((currMarker: any) => (
            <Marker
              coordinate={{...currMarker.coordinate}}
              key={currMarker.id}
            />
          ))}
          {isDirection && (
            <MapViewDirections
              origin={getFirstWaypoint()}
              waypoints={getWaypoints()}
              destination={getLastWaypoint()}
              apikey={GOOGLE_API_KEY}
              strokeWidth={3}
              strokeColor="hotpink"
              mode="WALKING"
            />
          )}
        </MapView>
        <Flex style={styles.man}>
          <IconButton
            icon={<Icon name="direction" size={30} color="#1e9bf9" />}
            onPress={handleRenderingDirection}
          />
          <IconButton
            icon={<Icon name="man" size={30} color="#1e9bf9" />}
            onPress={moveToGeolocation}
          />
        </Flex>
        <Flex style={styles.trash}>
          <IconButton
            icon={<Icon name="trash" size={30} color="#1e9bf9" />}
            onPress={clearAllMarkers}
          />
        </Flex>
      </Box>
    </Box>
  );
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },

  page__title: {
    fontSize: 28,
    color: 'lightgrey',
  },

  nav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  nav__button: {
    width: '45%',
    backgroundColor: '#1e9bf9',
  },

  'nav__button-text': {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'white',
  },

  divider: {
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: '#1e9bf9',
  },

  alert: {
    marginBottom: 12,
  },

  alert__text: {
    textAlign: 'center',
  },

  map__container: {
    position: 'relative',
    height: '72%',
    overflow: 'hidden',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  map: {
    display: 'flex',
    flexGrow: 1,
  },

  man: {
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'flex-end',
  },

  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },

  trash: {
    position: 'absolute',
  },
});
