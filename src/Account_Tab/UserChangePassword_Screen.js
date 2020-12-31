/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ScalableText from 'react-native-text';
import Input from '../Components/Input';
import HeaderCustom from '../Components/Header_Custom';
import Loading_Screen from '../Components/Loading_Screen';
import {RNToasty} from 'react-native-toasty';
import host from '../Server/host';
import Wait from '../Components/Wait';
import Regex from '../ScriptFile/Regex';

const UserChangePassword_Screen = ({navigation, route}) => {
  const data = route.params.changePassword;
  const [admin, setAdmin] = useState(null);

  const [oldPassCheck, setOldPassCheck] = useState(data.id);

  const [newPass, setNewPass] = useState('');
  const [newPassCheck, setNewPassCheck] = useState('');

  const [checkOldPasss, setcheckOldPass] = useState(true);
  const [checkNewPass, setcheckNewPass] = useState(true);
  const [checkNewPassCheck, setcheckNewPassCheck] = useState(true);

  const [statusOldPasss, setstatusOldPass] = useState(false);
  const [statusNewPass, setstatusNewPass] = useState(false);
  const [statusNewPassCheck, setstatusNewPassCheck] = useState(false);

  const [visibleAlert, setVisibleAlert] = useState(false);
  const [waitDone, setWaitDone] = useState(false);
  const [error, setError] = useState(false);

  const [visible, setVisible] = useState(false);

  const check_OldPass = (content) => {
    if (Regex(content, 'password') == false) {
      RNToasty.Error({
        title: 'Mật khẩu cần ít nhất 8 kí tự và không chứa kí tự đặc biệt',
        duration: 1,
      });
      setcheckOldPass(false);
      setVisible(false);
      setstatusOldPass(false);
    } else {
      _CheckPass();
    }
  };
  const check_NewPass = (content) => {
    if (Regex(content, 'password') == false) {
      RNToasty.Error({
        title: 'Mật khẩu cần ít nhất 8 kí tự và không chứa kí tự đặc biệt',
        duration: 1,
      });
      setcheckNewPass(false);
      setstatusNewPass(false);
    } else if (newPassCheck !== '' && content !== newPassCheck) {
      RNToasty.Error({
        title: 'Mật khẩu phải giống nhau',
        duration: 1,
      });
      setcheckNewPass(true);
      setcheckNewPassCheck(false);
      setstatusNewPass(true);
      setstatusNewPassCheck(false);
    } else if (newPassCheck == '') {
      setstatusNewPassCheck(false);
      setcheckNewPass(true);
      setstatusNewPass(true);
    } else {
      setcheckNewPass(true);
      setcheckNewPassCheck(true);
      setstatusNewPass(true);
      setstatusNewPassCheck(true);
    }
  };
  const check_NewPassCheck = (content) => {
    if (content !== newPass || content == '' || newPass == '') {
      RNToasty.Error({
        title: 'Mật khẩu mới phải giống nhau',
        duration: 1,
      });
      setcheckNewPassCheck(false);
      setstatusNewPassCheck(false);
    } else {
      setcheckNewPass(true);
      setcheckNewPassCheck(true);
      setstatusNewPass(true);
      setstatusNewPassCheck(true);
    }
  };
  const check_Save = () => {
    return statusOldPasss && statusNewPass && statusNewPassCheck ? false : true;
  };
  const checkPermission = () => {
    if (admin == null) {
      switch (data.permission) {
        case 'admin':
          setAdmin(true);
          setVisible(true);
          setstatusOldPass(true);
          break;
        case 'user':
          setAdmin(false);
          setVisible(false);
          setstatusOldPass(false);
          break;
      }
    }
  };
  useEffect(() => {
    checkPermission();
  });
  const _CheckPass = () => {
    return fetch(host.checkPass, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: oldPassCheck,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson[0]);
        switch (true) {
          case responseJson[0] == undefined:
            RNToasty.Error({
              title: 'Mật khẩu hiện tại không đúng',
              duration: 1,
            });
            setcheckOldPass(false);
            setVisible(false);
            setstatusOldPass(false);
            break;
          case responseJson[0] !== undefined:
            setcheckOldPass(true);
            setVisible(true);
            setstatusOldPass(true);
            break;
        }
      })
      .catch((error) => {
        console.error(error);
        RNToasty.Error({
          title: 'Lỗi',
        });
      });
  };
  const _changePassUserFromAPI = () => {
    return fetch(host.changePass, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data.id,
        password: newPassCheck,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson == 'successed') {
          setWaitDone(true);
          setError(false);
        }
      })
      .catch((error) => {
        // console.error(error);
        setWaitDone(true);
        setError(true);
      });
  };
  return (
    <View style={styles.parent}>
      <HeaderCustom
        title="Đổi mật khẩu"
        navigationHeader={navigation}
        rightComponent={
          <TouchableOpacity
            disabled={check_Save()}
            onPress={() => {
              setWaitDone(false);
              setError(false);
              setVisibleAlert(true);
              _changePassUserFromAPI();
            }}>
            <ScalableText
              style={{color: check_Save() ? '#989898' : '#fff', fontSize: 17}}>
              Lưu
            </ScalableText>
          </TouchableOpacity>
        }
        // onBackRefresh={onBackRefresh.state.params.test(true)}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: '3%',
        }}>
        {admin ? null : (
          <View>
            <ScalableText style={styles.text_input}>
              Mật khẩu hiện tại
            </ScalableText>
            <Input
              heightParent={40}
              heightI={18}
              placeHolder="Nhập mật khẩu hiện tại"
              value={oldPassCheck}
              check={checkOldPasss}
              codeCheck={check_OldPass}
              onChangeText={setOldPassCheck}
              noIcon={true}
            />
          </View>
        )}
        {visible ? (
          <View>
            <View>
              <ScalableText style={styles.text_input}>
                Mật khẩu mới
              </ScalableText>
              <Input
                heightParent={40}
                heightI={18}
                placeHolder="Nhập mật khẩu mới"
                value={newPass}
                check={checkNewPass}
                codeCheck={check_NewPass}
                onChangeText={setNewPass}
                noIcon={true}
              />
            </View>
            <View>
              <ScalableText style={styles.text_input}>
                Nhập lại mật khẩu mới
              </ScalableText>
              <Input
                heightParent={40}
                heightI={18}
                placeHolder="Nhập lại mật khẩu mới"
                value={newPassCheck}
                check={checkNewPassCheck}
                codeCheck={check_NewPassCheck}
                onChangeText={setNewPassCheck}
                noIcon={true}
              />
            </View>
          </View>
        ) : null}
      </View>
      <Wait
        show={visibleAlert}
        setShow={setVisibleAlert}
        title="Đổi mật khẩu"
        waitDone={waitDone}
        setWaitDone={setWaitDone}
        error={error}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  text_input: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: '2%',
  },
});

export default UserChangePassword_Screen;
