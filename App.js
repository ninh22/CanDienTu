import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import Result_Screen from './src/Result_Screen';
import ResultDetail_Screen from './src/ResultDetail_Screen';
import SearchScreen from './src/Search_Screen';
import LoginScreen from './src/Login_Screen';
import HomeAdmin_Screen from './src/HomeAdmin_Screen';
import SearchHaveAcc_Screen from './src/SearchHaveAcc_Screen';
import ListUser_Screen from './src/ListUser_Screen';
import UserDetail_Screen from './src/UserDetail_Screen';
import EditUser_Screen from './src/EditUser_Screen';
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
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="searchscreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="searchscreen" component={SearchScreen} />
          <Stack.Screen name="resultscreen" component={Result_Screen} />
          <Stack.Screen
            name="resultdetailscreen"
            component={ResultDetail_Screen}
          />
          <Stack.Screen name="loginscreen" component={LoginScreen} />
          <Stack.Screen name="homeadminscreen" component={HomeAdmin_Screen} />
          <Stack.Screen
            name="searchhaveaccscreen"
            component={SearchHaveAcc_Screen}
          />
          <Stack.Screen name="listuserscreen" component={ListUser_Screen} />
          <Stack.Screen name="userdetailscreen" component={UserDetail_Screen} />
          <Stack.Screen name="edituserscreen" component={EditUser_Screen} />
          <Stack.Screen name="tongQuanUser" component={TongQuanUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
