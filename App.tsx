import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {Home} from './components/Home/Home';
import {AddingForm} from './components/AddingForm/AddingForm';
import {PathsList} from './components/PathsList/PathsList';
import {Paths} from './stores/paths';
import {ObservablePaths} from './ObservablePaths';

const Stack = createNativeStackNavigator();
const paths = new Paths();

const App = () => {
  return (
    <ObservablePaths.Provider value={paths}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={AddingForm} />
            <Stack.Screen name="List" component={PathsList} />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </ObservablePaths.Provider>
  );
};

export default App;
