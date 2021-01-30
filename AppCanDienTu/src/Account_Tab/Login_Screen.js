/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button, CheckBox} from 'react-native-elements';
import Input from '../Components/Input';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import CardView from '../Components/CardView_Custom';
import {RNToasty} from 'react-native-toasty';
import ScalableText from 'react-native-text';
import host from '../Server/host';
import Regex from '../ScriptFile/Regex';

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
  const [account, setAccount] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [checkAcc, setCheckAcc] = useState(true);
  const [checkPass, setCheckPass] = useState(true);
  const [statusAcc, setStatusAcc] = useState(true);
  const [statusPass, setStatusPass] = useState(true);

  const [save, setSave] = useState(false);
  const [hide, setHide] = useState(true);
  const [boxhide, setBoxhide] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const check_Acc = (content) => {
    if (Regex(content, 'username') == false) {
      RNToasty.Error({
        title:
          'Tài khoản cần ít nhất 3 kí tự, không chứa kí tự đặc biệt, ký từ đầu phải là chữ và không quá 10 kí tự',
        duration: 1,
      });
      setCheckAcc(false);
      setStatusAcc(false);
    } else {
      setCheckAcc(true);
      setStatusAcc(true);
    }
  };
  const check_Pass = (content) => {
    if (Regex(content, 'password') == false) {
      RNToasty.Error({
        title: 'Mật khẩu cần ít nhất 8 kí tự và không chứa kí tự đặc biệt',
        duration: 1,
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
        // console.log(responseJson[0]);
        switch (true) {
          case responseJson == '':
            setShowAlert(true);
            break;
          case responseJson !== '' && save == false:
            navigationProps(responseJson[0].idusergroup, responseJson[0].id);
            break;
          case responseJson !== '' && save == true:
            _storeData(
              '@Key',
              JSON.stringify({
                id: responseJson[0].id,
                idGroup: responseJson[0].idusergroup,
              }),
            );
            navigationProps(responseJson[0].idusergroup, responseJson[0].id);
            break;
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
  const navigationProps = (check, id) => {
    RNToasty.Success({
      title: 'Đăng nhập thành công',
    });
    switch (check) {
      case 0:
        navigation.replace('homeadminscreen', {id: id});
        break;
      default:
        navigation.replace('homeuserscreen', {id: id, idGroup: check});
        break;
    }
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
            navigation.replace('homeadminscreen', {id: 0});
            //_Login();
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
              navigation.navigate('homeuserscreen');
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
