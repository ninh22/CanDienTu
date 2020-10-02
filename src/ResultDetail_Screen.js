/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button, Image} from 'react-native-elements';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const ResultDetail_Screen = ({navigation, route}) => {
  const [item, setItem] = useState(route.params.item);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.img}>
            <Image source={{uri: item.img}} style={styles.img} />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 10,
              }}
              onPress={() => {
                navigation.goBack();
                // console.log(moment().format('DD/MM/YYYY hh:mm:ss'));
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.26)',
                  borderRadius: 50,
                }}>
                <Icon name="chevron-back-outline" size={35} color="#fff" />
              </View>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                margin: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                padding: 7,
                borderRadius: 10,
              }}>
              <Text style={{color: 'black'}}>2/4</Text>
            </View>
          </View>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 20}}>Số phiếu: 1</Text>
            <Text style={{fontSize: 20}}>Xe số: 92C-04610</Text>
            <Text style={{fontSize: 20}}>Khách hàng: Bê tông Đại Đường</Text>
            <Text style={{fontSize: 20}}>Hàng hoá: Xi măng</Text>
            <Text style={{fontSize: 20}}>
              Trọng lượng toàn bộ: 50,870 (65000 Đồng)
            </Text>
            <Text style={{fontSize: 20}}>Trọng lượng xe: 19,140 (0 Đồng)</Text>
            <Text style={{fontSize: 20}}>
              Trọng lượng hàng hoá: 31,730 (65000 Đồng)
            </Text>
            <Text style={{fontSize: 20}}>Ngày giờ cân: 01/09/2018 08:49</Text>
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
  img: {
    width: '100%',
    height: 300,
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
});

export default ResultDetail_Screen;
