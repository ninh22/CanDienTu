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
import CheckStatusAcc_Screen from './src/Account_Tab/CheckStatusAcc_Screen';
import UserChangePassword_Screen from './src/Account_Tab/UserChangePassword_Screen';
// Admin
import HomeAdmin_Screen from './src/Account_Tab/Admin/HomeAdmin_Screen';
import Add_Screen from './src/Account_Tab/Admin/Add_Screen';
// Admin_UserGroup
import ListUserGroup_Screen from './src/Account_Tab/Admin/ListUserGroup_Screen';
import UserGroupInfo_Screen from './src/Account_Tab/Admin/UserGroupInfo_Screen';
// Admin_User
import ListUser_Screen from './src/Account_Tab/Admin/ListUser_Screen';
import DetailUser_Screen from './src/Account_Tab/Admin/DetailUser_Screen';
// Option
import EditUser_Screen from './src/Account_Tab/Admin/EditUser_Screen';
import AddAccount_Screen from './src/Account_Tab/Admin/AddAccount_Screen';
import AddUserGroup_Screen from './src/Account_Tab/Admin/AddUserGroup_Screen';
// User
import HomeUser_Screen from './src/Account_Tab/User/HomeUser_Screen';
import TongQuanUser from './src/TongQuan/TongQuanThongKeUser';
import UserInfo_Screen from './src/Account_Tab/User/UserInfo_Screen';
import Overview_Screen from './src/Account_Tab/User/Overview_Screen';
import DetailDiagram_Screen from './src/Account_Tab/User/DetailDiagram_Screen';

console.disableYellowBox = true; // Hide Warning

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="home" component={Home_Screen} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator headerMode="none">
      <SearchStack.Screen name="searchscreen" component={Search_Screen} />
    </SearchStack.Navigator>
  );
}

const listStackPerson = [
  {
    name: 'loginscreen',
    component: Login_Screen,
  },
  // Admin
  {
    name: 'homeadminscreen',
    component: HomeAdmin_Screen,
  },
  {
    name: 'addscreen',
    component: Add_Screen,
  },
  // User
  {
    name: 'homeuserscreen',
    component: HomeUser_Screen,
  },
];

const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator headerMode="none" initialRouteName="loginscreen">
      {listStackPerson.map((l, i) => (
        <LoginStack.Screen key={i} name={l.name} component={l.component} />
      ))}
    </LoginStack.Navigator>
  );
}

const AdminHomePersonStack = createStackNavigator();

function AdminHomePersonStackScreen() {
  return (
    <AdminHomePersonStack.Navigator
      headerMode="none"
      initialRouteName="homeadminscreen">
      {listStackPerson.map((l, i) => (
        <AdminHomePersonStack.Screen
          key={i}
          name={l.name}
          component={l.component}
        />
      ))}
    </AdminHomePersonStack.Navigator>
  );
}

const UserHomePersonStack = createStackNavigator();

function UserHomePersonStackScreen() {
  return (
    <UserHomePersonStack.Navigator
      headerMode="none"
      initialRouteName="homeuserscreen">
      {listStackPerson.map((l, i) => (
        <UserHomePersonStack.Screen
          key={i}
          name={l.name}
          component={l.component}
        />
      ))}
    </UserHomePersonStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
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
      <Tab.Screen name="Tài khoản" component={LoginStackScreen} />
    </Tab.Navigator>
  );
};

const TabAdmin = createBottomTabNavigator();

const TabAdminScreen = () => {
  return (
    <TabAdmin.Navigator
      initialRouteName="Tài khoản"
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
      <TabAdmin.Screen name="Trang chủ" component={HomeStackScreen} />
      <TabAdmin.Screen name="Tra cứu" component={SearchStackScreen} />
      <TabAdmin.Screen
        name="Tài khoản"
        component={AdminHomePersonStackScreen}
      />
    </TabAdmin.Navigator>
  );
};

const TabUser = createBottomTabNavigator();

const TabUserScreen = () => {
  return (
    <TabUser.Navigator
      initialRouteName="Tài khoản"
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
      <TabUser.Screen name="Trang chủ" component={HomeStackScreen} />
      <TabUser.Screen name="Tra cứu" component={SearchStackScreen} />
      <TabUser.Screen name="Tài khoản" component={UserHomePersonStackScreen} />
    </TabUser.Navigator>
  );
};

const listStack = [
  // HomeTab
  {
    name: 'product',
    component: Product_Screen,
  },
  {
    name: 'productdetail',
    component: ProductDetail_Screen,
  },
  // SearchTab
  {
    name: 'resultscreen',
    component: Result_Screen,
  },
  {
    name: 'resultdetailscreen',
    component: ResultDetail_Screen,
  },
  // PersonTab
  {
    name: 'userchangepasswordscreen',
    component: UserChangePassword_Screen,
  },
  {
    name: 'checkstatusaccscreen',
    component: CheckStatusAcc_Screen,
  },
  // Admin_UserGroup
  {
    name: 'listusergroupscreen',
    component: ListUserGroup_Screen,
  },
  {
    name: 'usergroupinfoscreen',
    component: UserGroupInfo_Screen,
  },
  // Admin_User
  {
    name: 'listuserscreen',
    component: ListUser_Screen,
  },
  {
    name: 'detailuserscreen',
    component: DetailUser_Screen,
  },
  // Option
  {
    name: 'edituserscreen',
    component: EditUser_Screen,
  },
  {
    name: 'addaccountscreen',
    component: AddAccount_Screen,
  },
  {
    name: 'addusergroupscreen',
    component: AddUserGroup_Screen,
  },
  // User
  {
    name: 'tongQuanUser',
    component: TongQuanUser,
  },
  {
    name: 'userinfoscreen',
    component: UserInfo_Screen,
  },
  {
    name: 'overviewscreen',
    component: Overview_Screen,
  },
  {
    name: 'detaildiagramscreen',
    component: DetailDiagram_Screen,
  },
];

const Stack = createStackNavigator();

const App = () => {
  const [checkLogin, setCheckLogin] = useState(null);
  const [checkAdmin, setCheckAdmin] = useState(null);
  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('@Key');
      value = await JSON.parse(value);
      if (value !== null) {
        setCheckLogin(true);
        switch (value.idGroup) {
          case 0:
            setCheckAdmin(true);
            break;
          default:
            setCheckAdmin(false);
            break;
        }
      } else {
        setCheckLogin(false);
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
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="tab">
            {checkLogin ? (
              checkAdmin ? (
                <Stack.Screen name="tab" component={TabAdminScreen} />
              ) : (
                <Stack.Screen name="tab" component={TabUserScreen} />
              )
            ) : (
              <Stack.Screen name="tab" component={TabScreen} />
            )}
            {listStack.map((l, i) => (
              <Stack.Screen key={i} name={l.name} component={l.component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
