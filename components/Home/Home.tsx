import React, {useContext} from 'react';
import {
  Heading,
  Box,
  Button,
  Flex,
  Divider,
  Text,
  Alert,
  HStack,
} from 'native-base';
import {StyleSheet} from 'react-native';
import {Map} from '../Map/Map';
import {ObservableMarkers} from '../../ObservablePaths';
import {observer} from 'mobx-react-lite';

export const Home = observer(({navigation}: any) => {
  const marker = useContext(ObservableMarkers);

  const navigateToForm = () => {
    if (marker.isMarkersCountValid()) {
      navigation.navigate('Form');
    }
  };

  const navigateToPathsList = () => {
    navigation.navigate('List');
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
      <Map />
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
});
