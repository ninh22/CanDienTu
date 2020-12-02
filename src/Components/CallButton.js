/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import call from 'react-native-phone-call';
import host from '../Server/host';
import {RNToasty} from 'react-native-toasty';

const CallButton = () => {
  const [number, setNumber] = useState(null);
  const _getNumberFromApi = () => {
    return fetch(host.GetNumber)
      .then((response) => response.json())
      .then((json) => {
        //   console.log(json[0].value);
        setNumber(json[0].value);
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
      containerStyle={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1%',
      }}
      buttonStyle={{
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#309045',
      }}
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

export default CallButton;
