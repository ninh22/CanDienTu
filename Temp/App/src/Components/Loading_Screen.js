/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Dimensions, Image} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Loading_Screen = ({code, visible, edgesTop}) => {
  return (
    <SafeAreaView
      edges={
        edgesTop
          ? ['top', 'right', 'bottom', 'left']
          : ['right', 'bottom', 'left']
      }>
      {visible ? (
        <View
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            position: 'absolute',
            backgroundColor: 'white',
            top: 0,
            zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              // tintColor: '#309045',
            }}
            source={require('../Images/loading/Spin-1s-200px.gif')}
          />
        </View>
      ) : (
        code
      )}
    </SafeAreaView>
  );
};

export default Loading_Screen;
