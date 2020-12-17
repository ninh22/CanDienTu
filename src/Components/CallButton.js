/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const ButtonAbsolute = ({icon, onPress}) => {
  const {button, container} = styles;
  return (
    <Button
      title={<Icon name={icon} size={25} color="#fff" />}
      containerStyle={container}
      buttonStyle={button}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#309045',
  },
});

export default ButtonAbsolute;
