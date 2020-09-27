import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const IntroScreen = ({navigation}) => {
  useEffect(() => {
    wait(2000).then(() => {
      navigation.navigate('searchscreen');
    });
  });

  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Image style={styles.img_logo} source={require('./Images/logo.png')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img_logo: {
    width: '100%',
    height: '100%',
  },
});

export default IntroScreen;
