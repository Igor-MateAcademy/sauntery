import React from 'react';
import {Heading, Box, Button, Flex, Divider, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export const Home = ({navigation}: any) => {
  const navigateToForm = () => navigation.navigate('Form');
  const navigateToPathsList = () => navigation.navigate('List');

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
      <Heading style={styles.page__title}>Map</Heading>
    </Box>

    // implement google map
  );
};

const styles = StyleSheet.create({
  page: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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
});
