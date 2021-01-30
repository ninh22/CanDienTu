/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardView from '../Components/CardView_Custom';
import {StyleSheet, View, Image} from 'react-native';
import ScalableText from 'react-native-text';
import host from '../Server/host';
import _removeData from '../ScriptFile/Logout';
import {RNToasty} from 'react-native-toasty';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckStatusAcc_Screen = ({navigation}) => {
  const {view_parent, view_loading} = styles;
  const [show, setShow] = useState(false);
  useEffect(() => {
    _retrieveData();
  });
  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('@Key');
      value = await JSON.parse(value);
      await CheckStatusAcc(value.id, value.idGroup);
    } catch (error) {
      // Error retrieving data
    }
  };
  const CheckStatusAcc = (id, idGroup) => {
    return fetch(host.checkStatusUser, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson[0]);
        if (responseJson == '') {
          setShow(true);
        } else {
          switch (idGroup) {
            case 0:
              navigation.replace('homeadminscreen');
              break;
            default:
              navigation.replace('homeuserscreen');
              break;
          }
        }
      })
      .catch((error) => {
        console.error(error);
        RNToasty.Error({
          title: 'Lỗi',
        });
        // Alert.alert('Thông báo', 'Lỗi', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
      });
  };
  return (
    <CardView
      title="Kiểm Tra Tài Khoản"
      content={
        <View style={view_parent}>
          {show ? null : (
            <Image
              style={view_loading}
              source={require('../Images/loading/Spin-1s-200px.gif')}
            />
          )}
          <ScalableText>Vui lòng chờ...</ScalableText>
          <SCLAlert
            theme={'danger'}
            show={show}
            title={'Lỗi'}
            subtitle={'Không Tìm Thấy Tài Khoản'}
            headerIconComponent={
              <Icon name="close-circle" size={35} color="#fff" />
            }
            cancellable={false}>
            <SCLAlertButton
              theme={'danger'}
              onPress={() => {
                // setShow(false);
                _removeData(navigation);
              }}>
              Xác nhận
            </SCLAlertButton>
          </SCLAlert>
        </View>
      }
    />
  );
};
const styles = StyleSheet.create({
  view_parent: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_loading: {
    width: 50, //30
    height: 50, //30
    marginBottom: '3%',
  },
});
export default CheckStatusAcc_Screen;
