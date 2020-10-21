import 'react-native-gesture-handler';

import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import Result_Screen from './src/Result_Screen';
import ResultDetail_Screen from './src/ResultDetail_Screen';
import Search_Screen from './src/Search_Screen';
import Login_Screen from './src/Login_Screen';
import Home_Screen from './src/Home_Screen';
import HomeAdmin_Screen from './src/HomeAdmin_Screen';
import ListUser_Screen from './src/ListUser_Screen';
import UserDetail_Screen from './src/UserDetail_Screen';
import EditUser_Screen from './src/EditUser_Screen';
import TongQuanUser from './src/TongQuan/TongQuanThongKeUser';
import Product_Screen from './src/Product_Screen';

console.disableYellowBox = true; // Hide Warning

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={Home_Screen} />
      <HomeStack.Screen name="Product" component={Product_Screen} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="searchscreen" component={Search_Screen} />
      <SearchStack.Screen name="resultscreen" component={Result_Screen} />
      <SearchStack.Screen
        name="resultdetailscreen"
        component={ResultDetail_Screen}
      />
    </SearchStack.Navigator>
  );
}

const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode="none">
      <LoginStack.Screen name="loginscreen" component={Login_Screen} />
      <LoginStack.Screen name="homeadminscreen" component={HomeAdmin_Screen} />
      <LoginStack.Screen name="listuserscreen" component={ListUser_Screen} />
      <LoginStack.Screen
        name="userdetailscreen"
        component={UserDetail_Screen}
      />
      <LoginStack.Screen name="edituserscreen" component={EditUser_Screen} />
      <LoginStack.Screen name="tongQuanUser" component={TongQuanUser} />
    </LoginStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          initialRouteName="Trang chủ"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Trang chủ') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Tra cứu') {
                iconName = focused ? 'md-search-sharp' : 'md-search-outline';
              } else if (route.name === 'Tài khoản') {
                iconName = focused
                  ? 'md-person-circle'
                  : 'md-person-circle-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#309045',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Trang chủ" component={HomeStackScreen} />
          <Tab.Screen name="Tra cứu" component={SearchStackScreen} />
          <Tab.Screen name="Tài khoản" component={LoginStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
