/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ScalableText from 'react-native-text';
import Input from '../Components/Input';
import HeaderCustom from '../Components/Header_Custom';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import {RNToasty} from 'react-native-toasty';

const Components = ({navigationComponents, dataRoute, onBackRefresh}) => {
  const [oldPass, setOldPass] = useState(dataRoute);
  const [oldPassCheck, setOldPassCheck] = useState('');

  const [newPass, setNewPass] = useState('');
  const [newPassCheck, setNewPassCheck] = useState('');

  const [checkOldPasss, setcheckOldPass] = useState(true);
  const [checkNewPass, setcheckNewPass] = useState(true);
  const [checkNewPassCheck, setcheckNewPassCheck] = useState(true);

  const [statusOldPasss, setstatusOldPass] = useState(false);
  const [statusNewPass, setstatusNewPass] = useState(false);
  const [statusNewPassCheck, setstatusNewPassCheck] = useState(false);

  const [visible, setVisible] = useState(false);
  const [save, setSave] = useState(true);

  const check_OldPass = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Nội dung không được để trống',
      });
      setcheckOldPass(false);
      setVisible(false);
    } else if (content !== oldPass) {
      RNToasty.Error({
        title: 'Mật khẩu cũ không đúng',
      });
      setcheckOldPass(false);
      setVisible(false);
    } else {
      setcheckOldPass(true);
      setVisible(true);
    }
  };
  const check_NewPass = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Nội dung không được để trống',
      });
      setcheckNewPass(false);
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
    if (oldPassCheck !== oldPass) {
      setstatusOldPass(false);
    } else {
      setstatusOldPass(true);
    }
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
  useEffect(() => {
    check_Save();
  });
  return (
    <View style={styles.parent}>
      <HeaderCustom
        title="Đổi mật khẩu"
        navigationHeader={navigationComponents}
        rightComponent={
          <TouchableOpacity
            disabled={save}
            onPress={() => {
              alert(123);
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
        <View>
          <ScalableText style={styles.text_input}>Mật khẩu cũ</ScalableText>
          <Input
            heightParent={40}
            heightI={18}
            placeHolder="Nhập mật khẩu cũ"
            value={oldPassCheck}
            check={checkOldPasss}
            codeCheck={check_OldPass}
            onChangeText={setOldPassCheck}
            noIcon={true}
          />
        </View>
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
    </View>
  );
};

const UserChangePassword_Screen = ({navigation, route}) => {
  const [data, setData] = useState(route.params.password);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={<Components navigationComponents={navigation} dataRoute={data} />}
    />
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
