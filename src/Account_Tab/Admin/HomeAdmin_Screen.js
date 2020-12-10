/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUserAction, loadMoreUserAction} from '../../Redux/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card, Button, Badge} from 'react-native-elements';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';

const Item = ({list}) => {
  const {} = styles;
  return (
    <View>
      {list.map((l, i) => (
        <View
          style={{
            width: '100%',
            height: Response_Size('hg', 0, 33),
            backgroundColor: 'blue',
          }}>
          <ScalableText>{l.title}</ScalableText>
        </View>
      ))}
    </View>
  );
};

const HomeAdmin_Screen = ({navigation}) => {
  const dispatch = useDispatch();
  const nullItem = (item) => dispatch(getUserAction(item));
  const list = [{title: '123'}, {title: '123'}, {title: '123'}];
  useEffect(() => {
    // console.log(tabBarHeight);
  });
  return (
    <ScrollView>
      <View style={styles.parent}>
        <Item list={list} />
      </View>
    </ScrollView>
  );
};

const _removeData = async (navigation) => {
  try {
    await AsyncStorage.removeItem('@Key');
    navigation.replace('loginscreen');
    // console.warn(value);
  } catch (error) {
    // Error retrieving data
    // console.error(error);
  }
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
});

export default HomeAdmin_Screen;
