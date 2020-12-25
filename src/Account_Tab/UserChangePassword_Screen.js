/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ScalableText from 'react-native-text';
import Input from '../Components/Input';
import HeaderCustom from '../Components/Header_Custom';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import {RNToasty} from 'react-native-toasty';
import host from '../Server/host';
import Wait from '../Components/Wait';

const UserChangePassword_Screen = ({navigation, route}) => {
  const data = route.params.changePassword;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setVisible(false);
  //   }, 500);
  // });
  const [admin, setAdmin] = useState(false);

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
  const [save, setSave] = useState(true);

  const check_OldPass = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Nội dung không được để trống',
      });
      setcheckOldPass(false);
      setVisible(false);
    }
    // else if (content !== oldPass) {
    //   RNToasty.Error({
    //     title: 'Mật khẩu cũ không đúng',
    //   });
    //   setcheckOldPass(false);
    //   setVisible(false);
    // }
    else {
      // setcheckOldPass(true);
      // setVisible(true);
      _CheckPass();
    }
  };
  const check_NewPass = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Nội dung không được để trống',
      });
      setcheckNewPass(false);
    } else if (newPassCheck !== '' && content !== newPassCheck) {
      RNToasty.Error({
        title: 'Mật khẩu phải giống nhau',
      });
      setcheckNewPassCheck(false);
    } else {
      setcheckNewPass(true);
    }
  };
  const check_NewPassCheck = (content) => {
    if (content !== newPass) {
      RNToasty.Error({
        title: 'Mật khẩu mới phải giống nhau',
      });
      setcheckNewPassCheck(false);
    } else {
      setcheckNewPassCheck(true);
    }
  };
  const check_Save = () => {
    // if (oldPassCheck !== oldPass) {
    //   setstatusOldPass(false);
    // } else {
    //   setstatusOldPass(true);
    // }
    if (newPass == '') {
      setstatusNewPass(false);
    } else {
      setstatusNewPass(true);
    }
    if (newPassCheck !== newPass) {
      setstatusNewPassCheck(false);
    } else {
      setstatusNewPassCheck(true);
    }
    if (statusOldPasss && statusNewPass && statusNewPassCheck == true) {
      setSave(false);
    } else {
      setSave(true);
    }
  };
  const checkPermission = () => {
    switch (data.permission) {
      case 'admin':
        setAdmin(true);
        setVisible(true);
        setstatusOldPass(true);
        break;
      // case 'user':
      //   setAdmin(false);
      //   setVisible(false);
      //   break;
    }
  };
  useEffect(() => {
    checkPermission();
    check_Save();
    // console.log(data.id);
    // console.log(data.permission, admin, visible);
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
        // Alert.alert('Thông báo', 'Lỗi', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
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
          // RNToasty.Success({
          //   title: 'Đổi mật khẩu thành công',
          // });
        }
      })
      .catch((error) => {
        // console.error(error);
        setWaitDone(true);
        setError(true);
        // RNToasty.Warn({
        //   title: 'Đổi mật khẩu thất bại',
        // });
        // Alert.alert('Thông báo', 'Lỗi', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
      });
  };
  return (
    <View style={styles.parent}>
      <HeaderCustom
        title="Đổi mật khẩu"
        navigationHeader={navigation}
        rightComponent={
          <TouchableOpacity
            disabled={save}
            onPress={() => {
              setWaitDone(false);
              setError(false);
              setVisibleAlert(true);
              _changePassUserFromAPI();
            }}>
            <ScalableText
              style={{color: save ? '#989898' : '#fff', fontSize: 17}}>
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
