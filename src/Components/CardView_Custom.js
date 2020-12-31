/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';

const CardView = ({title, content}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <View style={styles.parent}>
          <View style={styles.img_view}>
            <Image source={require('../Images/logo1.png')} style={styles.img} resizeMode="stretch" />
          </View>
          <Card
            containerStyle={{
              borderRadius: 15,
              width: '100%',
              borderTopWidth: 10,
              borderTopColor: '#309045',
            }}>
            <Card.Title style={{fontSize: 20, fontWeight: 'normal'}}>
              {title}
            </Card.Title>
            <Card.Divider />
            {content}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  img_view: {
    width: Response_Size('wd', 0, 87),
    height: Response_Size('hg', 0, 15),
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default CardView;
