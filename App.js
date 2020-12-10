/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider} from 'react-redux';
import store from './src/Redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import RNBootSplash from 'react-native-bootsplash';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

// Home_Tab
import Home_Screen from './src/Home_Tab/Home_Screen';
import Product_Screen from './src/Home_Tab/Product_Screen';
import ProductDetail_Screen from './src/Home_Tab/ProductDetail_Screen';

// Search_Tab
import Result_Screen from './src/Search_Tab/Result_Screen';
import ResultDetail_Screen from './src/Search_Tab/ResultDetail_Screen';
import Search_Screen from './src/Search_Tab/Search_Screen';

// Account_Tab
import Login_Screen from './src/Account_Tab/Login_Screen';
import UserChangePassword_Screen from './src/Account_Tab/UserChangePassword_Screen';
// Admin
import HomeAdmin_Screen from './src/Account_Tab/Admin/HomeAdmin_Screen';
import ListUser_Screen from './src/Account_Tab/Admin/ListUser_Screen';
import DetailUser_Screen from './src/Account_Tab/Admin/DetailUser_Screen';
import EditUser_Screen from './src/Account_Tab/Admin/EditUser_Screen';
import AddUser_Screen from './src/Account_Tab/Admin/AddUser_Screen';
// User
import HomeUser_Screen from './src/Account_Tab/User/HomeUser_Screen';
import TongQuanUser from './src/TongQuan/TongQuanThongKeUser';
import UserInfo_Screen from './src/Account_Tab/User/UserInfo_Screen';

console.disableYellowBox = true; // Hide Warning

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="home" component={Home_Screen} />
      <HomeStack.Screen name="product" component={Product_Screen} />
      <HomeStack.Screen name="productdetail" component={ProductDetail_Screen} />
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
    <Provider store={store}>
      <LoginStack.Navigator headerMode="none" initialRouteName="loginscreen">
        <LoginStack.Screen name="loginscreen" component={Login_Screen} />
        <LoginStack.Screen
          name="userchangepasswordscreen"
          component={UserChangePassword_Screen}
        />
        {/* Admin */}
        <LoginStack.Screen
          name="homeadminscreen"
          component={HomeAdmin_Screen}
        />
        <LoginStack.Screen name="listuserscreen" component={ListUser_Screen} />
        <LoginStack.Screen
          name="detailuserscreen"
          component={DetailUser_Screen}
        />
        <LoginStack.Screen name="edituserscreen" component={EditUser_Screen} />
        <LoginStack.Screen name="adduserscreen" component={AddUser_Screen} />
        {/* User */}
        <LoginStack.Screen name="homeuserscreen" component={HomeUser_Screen} />
        <LoginStack.Screen name="tongQuanUser" component={TongQuanUser} />
        <LoginStack.Screen name="userinfoscreen" component={UserInfo_Screen} />
        {/* Phiếu */}
        <SearchStack.Screen name="resultscreen" component={Result_Screen} />
        <SearchStack.Screen
          name="resultdetailscreen"
          component={ResultDetail_Screen}
        />
      </LoginStack.Navigator>
    </Provider>
  );
}

const AdminHomePersonStack = createStackNavigator();

function AdminHomePersonStackScreen() {
  return (
    <Provider store={store}>
      <AdminHomePersonStack.Navigator
        headerMode="none"
        initialRouteName="homeadminscreen">
        <AdminHomePersonStack.Screen
          name="loginscreen"
          component={Login_Screen}
        />
        <AdminHomePersonStack.Screen
          name="userchangepasswordscreen"
          component={UserChangePassword_Screen}
        />
        {/* Admin */}
        <AdminHomePersonStack.Screen
          name="homeadminscreen"
          component={HomeAdmin_Screen}
        />
        <AdminHomePersonStack.Screen
          name="listuserscreen"
          component={ListUser_Screen}
        />
        <AdminHomePersonStack.Screen
          name="detailuserscreen"
          component={DetailUser_Screen}
        />
        <AdminHomePersonStack.Screen
          name="edituserscreen"
          component={EditUser_Screen}
        />
        <AdminHomePersonStack.Screen
          name="adduserscreen"
          component={AddUser_Screen}
        />
        {/* User */}
        <AdminHomePersonStack.Screen
          name="homeuserscreen"
          component={HomeUser_Screen}
        />
        <AdminHomePersonStack.Screen
          name="tongQuanUser"
          component={TongQuanUser}
        />
        <AdminHomePersonStack.Screen
          name="userinfoscreen"
          component={UserInfo_Screen}
        />
        {/* Phiếu */}
        <AdminHomePersonStack.Screen
          name="resultscreen"
          component={Result_Screen}
        />
        <AdminHomePersonStack.Screen
          name="resultdetailscreen"
          component={ResultDetail_Screen}
        />
      </AdminHomePersonStack.Navigator>
    </Provider>
  );
}

const UserHomePersonStack = createStackNavigator();

function UserHomePersonStackScreen() {
  return (
    <Provider store={store}>
      <UserHomePersonStack.Navigator
        headerMode="none"
        initialRouteName="homeadminscreen">
        <UserHomePersonStack.Screen
          name="loginscreen"
          component={Login_Screen}
        />
        <UserHomePersonStack.Screen
          name="userchangepasswordscreen"
          component={UserChangePassword_Screen}
        />
        {/* Admin */}
        <UserHomePersonStack.Screen
          name="homeadminscreen"
          component={HomeAdmin_Screen}
        />
        <UserHomePersonStack.Screen
          name="listuserscreen"
          component={ListUser_Screen}
        />
        <UserHomePersonStack.Screen
          name="detailuserscreen"
          component={DetailUser_Screen}
        />
        <UserHomePersonStack.Screen
          name="edituserscreen"
          component={EditUser_Screen}
        />
        <UserHomePersonStack.Screen
          name="adduserscreen"
          component={AddUser_Screen}
        />
        {/* User */}
        <UserHomePersonStack.Screen
          name="homeuserscreen"
          component={HomeUser_Screen}
        />
        <UserHomePersonStack.Screen
          name="tongQuanUser"
          component={TongQuanUser}
        />
        <UserHomePersonStack.Screen
          name="userinfoscreen"
          component={UserInfo_Screen}
        />
        {/* Phiếu */}
        <UserHomePersonStack.Screen
          name="resultscreen"
          component={Result_Screen}
        />
        <UserHomePersonStack.Screen
          name="resultdetailscreen"
          component={ResultDetail_Screen}
        />
      </UserHomePersonStack.Navigator>
    </Provider>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [checkLogin, setCheckLogin] = useState(null);
  const [checkAdmin, setCheckAdmin] = useState(null);
  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('@Key');
      value = await JSON.parse(value);
      // console.warn(value);
      if (value !== null) {
        // We have data!!
        // console.log(value);
        setCheckLogin(false);
        // switch (value.admin) {
        //   case '':
            
        //     break;
        
        //   default:
        //     break;
        // }
      } else {
        setCheckLogin(true);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  let init = async () => {
    // …do multiple async tasks
    _retrieveData();
  };
  useEffect(() => {
    init().finally(() => {
      RNBootSplash.hide({duration: 1000});
    });
  });

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
            keyboardHidesTabBar: true,
          }}>
          <Tab.Screen name="Trang chủ" component={HomeStackScreen} />
          <Tab.Screen name="Tra cứu" component={SearchStackScreen} />
          {checkLogin ? (
            <Tab.Screen name="Tài khoản" component={LoginStackScreen} />
          ) : checkAdmin ? (
            <Tab.Screen
              name="Tài khoản"
              component={AdminHomePersonStackScreen}
            />
          ) : (
            <Tab.Screen
              name="Tài khoản"
              component={AdminHomePersonStackScreen}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
