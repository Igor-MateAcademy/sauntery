import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {
  FormControl,
  Text,
  Input,
  Flex,
  TextArea,
  Button,
  Alert,
  HStack,
} from 'native-base';
import {FormData} from '../../types/FormData';
import {ObservablePaths, ObservableMarkers} from '../../Context';
import {observer} from 'mobx-react-lite';

export const AddingForm = observer(({navigation, route}: any) => {
  const paths = useContext(ObservablePaths);
  const marker = useContext(ObservableMarkers);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    points: [],
  });

  const goHome = () => {
    navigation.navigate('Home');
  };

  const submitForm = async () => {
    if (validateData()) {
      paths.addPath({
        ...formData,
        isFavorite: false,
        points: [...route.params.points],
        region: {...route.params.region},
      });

      marker.deleteAllMarkers();
      goHome();
    }

    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      points: [],
    });
  };

  const titleHandler = (value: string) => {
    setFormData({
      ...formData,
      title: value,
    });
  };

  const shortDescriptionHandler = (value: string) => {
    setFormData({
      ...formData,
      shortDescription: value,
    });
  };

  const fullDescriptionHandler = (value: string) => {
    setFormData({
      ...formData,
      fullDescription: value,
    });
  };

  const isTitleValid = () => formData.title.length >= 5;

  const isShortDescriptionValid = () => {
    const {shortDescription} = formData;

    return shortDescription.length > 0 && shortDescription.length < 160;
  };

  const isFullDescriptionValid = () => formData.fullDescription.length > 0;

  const validateData = () =>
    isTitleValid() && isShortDescriptionValid() && isFullDescriptionValid();

  return (
    <FormControl style={styles.form} isRequired>
      <Flex style={styles.container}>
        <Flex>
          <FormControl.Label>
            <Text style={styles.form__title}>Title</Text>
          </FormControl.Label>
          <Input
            style={styles.form__input}
            type="text"
            placeholder="Enter a path title..."
            onChangeText={titleHandler}
            value={formData.title}
            variant="underlined"
          />
          {!isTitleValid() ? (
            <Alert status="warning" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>
                  Title should contain at least 5 characters!
                </Text>
              </HStack>
            </Alert>
          ) : (
            <Alert status="success" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>Success!</Text>
              </HStack>
            </Alert>
          )}

          <FormControl.Label>
            <Text style={styles.form__title}>Short description</Text>
          </FormControl.Label>
          <TextArea
            type="text"
            onChangeText={shortDescriptionHandler}
            value={formData.shortDescription}
          />
          <FormControl.HelperText>
            {`Limit ${formData.shortDescription.length} of 160`}
          </FormControl.HelperText>
          {!isShortDescriptionValid() ? (
            <Alert status="warning" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>
                  This description must be shortest than 160 characters, but it
                  should be!
                </Text>
              </HStack>
            </Alert>
          ) : (
            <Alert status="success" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>Success!</Text>
              </HStack>
            </Alert>
          )}

          <FormControl.Label>
            <Text style={styles.form__title}>Full description</Text>
          </FormControl.Label>
          <TextArea
            type="text"
            style={styles.form__textarea}
            onChangeText={fullDescriptionHandler}
            value={formData.fullDescription}
          />
          {isFullDescriptionValid() ? (
            <Alert status="success" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>Success!</Text>
              </HStack>
            </Alert>
          ) : (
            <Alert status="warning" variant="outline">
              <HStack space={3} alignItems="center">
                <Alert.Icon />
                <Text style={styles.form__alert}>
                  This description is too short!
                </Text>
              </HStack>
            </Alert>
          )}
        </Flex>

        <Flex style={styles['form__button-container']}>
          <Button style={styles['form__button-submit']} onPress={goHome}>
            <Text style={styles['form__button-submit-text']}>Cancel</Text>
          </Button>

          <Button style={styles['form__button-submit']} onPress={submitForm}>
            <Text style={styles['form__button-submit-text']}>Add</Text>
          </Button>
        </Flex>
      </Flex>
    </FormControl>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between',
  },

  form: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: '100%',
  },

  form__title: {
    paddingTop: 20,
    fontSize: 28,
  },

  form__input: {
    height: 30,
    marginBottom: 12,
  },

  form__alert: {
    textAlign: 'center',
  },

  form__textarea: {
    height: 150,
    marginBottom: 12,
  },

  'form__button-container': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
    paddingBottom: 30,
  },

  'form__button-submit': {
    width: '45%',
    backgroundColor: '#1e9bf9',
  },

  'form__button-submit-text': {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    color: 'white',
  },
});
