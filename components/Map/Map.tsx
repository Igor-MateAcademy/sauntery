/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext, useRef} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {StyleSheet} from 'react-native';
import {Box, IconButton, Flex} from 'native-base';
import {observer} from 'mobx-react-lite';
import {ObservableMarkers} from '../../ObservablePaths';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Entypo';

export const Map = observer(() => {
  const marker = useContext(ObservableMarkers);
  const map = useRef<MapView>();

  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
    error: '',
  });

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

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
  }, []);

  const handleTouch = (event: any) => {
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

  // implement zooming function
  // eslint-disable-next-line
  const zooming = (option: string): void => {};

  const clearAllMarkers = (): void => {
    marker.deleteAllMarkers();
  };

  return (
    <Box style={styles.map__container}>
      {console.log('Map was re-rendered')}
      <MapView
        ref={(ref: any) => {
          map.current = ref;
        }}
        style={styles.map}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        onPress={handleTouch}>
        {marker.markers.map(currMarker => (
          <Marker coordinate={{...currMarker.coordinate}} key={currMarker.id} />
        ))}
      </MapView>
      <IconButton
        icon={<Icon name="man" size={30} color="#1e9bf9" />}
        style={styles.man}
        onPress={moveToGeolocation}
      />
      <Flex style={styles.zoom}>
        <IconButton
          icon={<Icon name="circle-with-plus" size={30} color="#1e9bf9" />}
          // onPress={zooming('increase')}
        />
        <IconButton
          icon={<Icon name="circle-with-minus" size={30} color="#1e9bf9" />}
          // onPress={zooming('decrease')}
        />
        <IconButton
          icon={<Icon name="trash" size={30} color="#1e9bf9" />}
          onPress={clearAllMarkers}
        />
      </Flex>
    </Box>
  );
});

const styles = StyleSheet.create({
  map__container: {
    position: 'relative',
    height: '72%',
    backgroundColor: 'yellow',
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

  zoom: {
    position: 'absolute',
  },
});
