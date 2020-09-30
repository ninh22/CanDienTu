import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

import IntroScrean from './src/Intro_Screen';
import SearchScrean from './src/Search_Screen';
import TongQuanUser from './src/TongQuan/TongQuanThongKeUser';
console.disableYellowBox = true; // Hide Warning
const Stack = createStackNavigator();
const App = () => {
  let init = async () => {
    // …do multiple async tasks
  };

  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 1000});
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="searchscrean"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="searchscrean" component={SearchScrean} />
        <Stack.Screen name="introscrean" component={IntroScrean} />
        <Stack.Screen name="tongQuanUser" component={TongQuanUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
