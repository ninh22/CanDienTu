/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card, Button, Badge} from 'react-native-elements';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const HomeAdmin_Screen = ({navigation, route}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.view_img} backgroundColor="#309045">
            <Image
              source={require('./Images/logo_white.png')}
              style={styles.img}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 10,
              }}
              onPress={() => {
                navigation.navigate('searchhaveaccscreen');
              }}>
              <View
                style={{
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="search" size={35} color="#fff" />
                <Text style={{color: '#fff', marginLeft: 5, fontSize: 15}}>
                  Tra cứu phiếu
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: 10,
              }}
              onPress={() => {
                navigation.navigate('searchhaveaccscreen');
              }}>
              <View
                style={{
                  borderRadius: 50,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon name="notifications" size={35} color="#fff" />
                <Badge
                  value="99+"
                  status="error"
                  containerStyle={{position: 'absolute', top: -3, right: -3}}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', height: 300}}>
            <View style={styles.parent_item}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('listuserscreen')}
                  style={styles.item}>
                  <FontAwesome5Icon name="users" size={40} color="#309045" />
                  <Text style={styles.item_txt}>Quản lý khách hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert(123)}
                  style={styles.item}>
                  <FontAwesome5Icon
                    name="user-plus"
                    size={40}
                    color="#309045"
                  />
                  <Text style={styles.item_txt}>Thêm khách hàng</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => alert(123)}
                  style={styles.item}>
                  <FontAwesome5Icon name="user-alt" size={40} color="#309045" />
                  <Text style={styles.item_txt}>Tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert(123)}
                  style={styles.item}>
                  <Icon name="log-out" size={40} color="#309045" />
                  <Text style={styles.item_txt}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#C9CFD3',
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 1,
  },
  view_img: {
    width: '100%',
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  img: {
    width: 350,
    height: 100,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#309045',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  txt: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
  parent_item: {
    width: '100%',
    height: '100%',
    padding: 10,
    position: 'absolute',
    top: -50,
  },
  item: {
    width: '45%',
    height: 130,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 5,
    borderColor: '#C9CFD3',
    borderWidth: 1,
  },
  item_txt: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 5,
  },
});

export default HomeAdmin_Screen;
