/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button, CheckBox, Header} from 'react-native-elements';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Input from '../Components/Input';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import CardView from '../Components/CardView_Custom';
import {RNToasty} from 'react-native-toasty';
import ScalableText from 'react-native-text';
import host from '../Server/host';

const CheckBoxScreen = (boxs) => {
  return (
    <CheckBox
      containerStyle={{
        marginVertical: 0,
        padding: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
      }}
      title={boxs.title}
      checked={boxs.checked}
      checkedColor="#309045"
      onPress={boxs.onPress}
    />
  );
};

const Login_Screen = ({navigation}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [checkAcc, setCheckAcc] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [statusAcc, setStatusAcc] = useState(false);
  const [statusPass, setStatusPass] = useState(false);

  const [save, setSave] = useState(false);
  const [hide, setHide] = useState(true);
  const [boxhide, setBoxhide] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const check_Acc = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Tài khoản không được để trống',
      });
      setCheckAcc(false);
      setStatusAcc(false);
    } else {
      setCheckAcc(true);
      setStatusAcc(true);
    }
  };
  const check_Pass = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Mật Khẩu không được để trống',
      });
      setCheckPass(false);
      setStatusPass(false);
    } else {
      setCheckPass(true);
      setStatusPass(true);
    }
  };
  const visible_Button = () => {
    return statusAcc && statusPass ? false : true;
  };
  const _Login = () => {
    return fetch(host.Login, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: account,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // console.log(responseJson[0]);
        if (responseJson == '') {
          setShowAlert(true);
        } else if (responseJson !== '' && save == false) {
          navigation.replace('homeadminscreen');
        } else if (responseJson !== '' && save == true) {
          _storeData('@Key', JSON.stringify(responseJson[0]));
          navigation.replace('homeadminscreen');
        }
        RNToasty.Success({
          title: 'Đăng nhập thành công',
        });
        // if (responseJson.check == 'notfull') {
        //   getUser(responseJson.data);
        // }
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
  const _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };
  const Content = () => {
    return (
      <View>
        <Input
          heightParent={40}
          heightI={18}
          placeHolder="Nhập tên tài khoản"
          nameIcon="person"
          value={account}
          check={checkAcc}
          codeCheck={check_Acc}
          onChangeText={setAccount}
        />
        <Input
          heightParent={40}
          heightI={18}
          secure={hide}
          placeHolder="Nhập mật khẩu"
          nameIcon="lock-closed-sharp"
          value={password}
          check={checkPass}
          codeCheck={check_Pass}
          onChangeText={setPassword}
        />
        <View style={styles.view_checkbox}>
          <CheckBoxScreen
            title="Hiện mật khẩu"
            checked={boxhide}
            onPress={() => {
              setBoxhide(!boxhide);
              setHide(!hide);
            }}
          />
          <CheckBoxScreen
            title="Lưu mật khẩu"
            checked={save}
            onPress={() => {
              setSave(!save);
            }}
          />
        </View>
        <Button
          buttonStyle={styles.btn}
          title="Đăng nhập"
          disabled={visible_Button()}
          onPress={() => {
            _Login();
          }}
        />
        {/* <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '3%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigation('homeuserscreen');
            }}>
            <ScalableText style={styles.txt}>Quên mật khẩu?</ScalableText>
          </TouchableOpacity>
        </View> */}
        <SCLAlert
          theme="danger"
          show={showAlert}
          title="Đăng nhập thất bại"
          headerIconComponent={
            <Icon name="close-circle" size={35} color="#fff" />
          }
          cancellable={false}
          subtitle="Vui lòng kiểm tra lại thông tin đăng nhập">
          <SCLAlertButton
            theme="danger"
            onPress={() => {
              setShowAlert(false);
            }}>
            Ok
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  };
  return <CardView title="Đăng nhập" content={Content()} />;
};

const styles = StyleSheet.create({
  view_checkbox: {
    marginBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: '100%',
    height: Response_Size('hg', 1, 40, 18.5),
    backgroundColor: '#309045',
    borderRadius: 10,
  },
  txt: {
    fontSize: 15,
  },
});

export default Login_Screen;