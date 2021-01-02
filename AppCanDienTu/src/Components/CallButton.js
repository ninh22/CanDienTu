/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import host from '../Server/host';
import {RNToasty} from 'react-native-toasty';
import call from 'react-native-phone-call';

const ButtonAbsolute = () => {
  const {button, container} = styles;
  const [number, setNumber] = useState(null);
  const _getNumberFromApi = () => {
    return fetch(host.getNumber, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setNumber(responseJson[0].value);
      })
      .catch((error) => {
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  useEffect(() => {
    _getNumberFromApi();
  });
  return (
    <Button
      title={<Icon name="call" size={25} color="#fff" />}
      containerStyle={container}
      buttonStyle={button}
      onPress={() => {
        const args = {
          number: number, // String value with the number to call
          prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
        };
        call(args).catch(console.error);
      }}
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
