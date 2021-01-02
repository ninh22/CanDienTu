/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScalableText from 'react-native-text';
import Input from '../../Components/Input';
import HeaderCustom from '../../Components/Header_Custom';
import Wait from '../../Components/Wait';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import {RNToasty} from 'react-native-toasty';
import {Button, Overlay} from 'react-native-elements';
import Regex from '../../ScriptFile/Regex';
import host from '../../Server/host';

const AddAccount_Screen = ({navigation}) => {
  const [visibleButtonLoading, setVisibleButtonLoading] = useState(false);
  const [visibleOverlay, setVisibleOverlay] = useState(false);

  const [titleAlert, setTitleAlert] = useState('Tạo tài khoản');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [waitDone, setWaitDone] = useState(false);
  const [error, setError] = useState(false);

  const [userIdGroup, setUserIdGroup] = useState('');
  const [nameIdGroup, setNameIdGroup] = useState('Chọn khách hàng');

  const [userAcc, setUserAcc] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userCheckPass, setUserCheckPass] = useState('');

  const [statusIdGroup, setStatusIdGroup] = useState(false);

  const [checkAcc, setCheckAcc] = useState(true);
  const [statusAcc, setStatusAcc] = useState(false);

  const [checkPass, setCheckPass] = useState(true);
  const [statusPass, setStatusPass] = useState(false);

  const [checkCheckPass, setCheckCheckPass] = useState(true);
  const [statusCheckPass, setStatusCheckPass] = useState(false);

  const [listItemDropDown, setListItemDropDown] = useState(null);

  const check_Content = (content, keyCheck) => {
    switch (keyCheck) {
      case 'Tên tài khoản':
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
        break;
      case 'Mật khẩu':
        if (Regex(content, 'password') == false) {
          RNToasty.Error({
            title: 'Mật khẩu cần ít nhất 8 kí tự và không chứa kí tự đặc biệt',
            duration: 1,
          });
          setCheckPass(false);
          setStatusPass(false);
        } else if (userCheckPass !== '' && content !== userCheckPass) {
          RNToasty.Error({
            title: 'Mật khẩu phải giống nhau',
            duration: 1,
          });
          setCheckCheckPass(false);
          setStatusCheckPass(false);
          setCheckPass(true);
          setStatusPass(true);
        } else if (userCheckPass == '') {
          setStatusCheckPass(false);
          setCheckPass(true);
          setStatusPass(true);
        } else {
          setCheckPass(true);
          setStatusPass(true);
          setCheckCheckPass(true);
          setStatusCheckPass(true);
        }
        break;
      case 'Nhập lại mật khẩu':
        if (content !== userPass || content == '' || userPass == '') {
          RNToasty.Error({
            title: 'Mật khẩu phải giống nhau',
            duration: 1,
          });
          setCheckCheckPass(false);
          setStatusCheckPass(false);
        } else {
          setCheckCheckPass(true);
          setStatusCheckPass(true);
          setCheckPass(true);
          setStatusPass(true);
        }
        break;
    }
  };

  const visible_Button = () => {
    return statusIdGroup && statusAcc && statusPass && statusCheckPass
      ? false
      : true;
  };

  const _getAllUserGroupFromAPI = () => {
    return fetch(host.getAllUsersGroup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setListItemDropDown(responseJson);
        setVisibleButtonLoading(false);
        setVisibleOverlay(!visibleOverlay);
      })
      .catch((error) => {
        RNToasty.Error({
          title: 'Lỗi',
        });
      });
  };

  const _AddAccount = () => {
    return fetch(host.addAccount, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userAcc,
        password: userCheckPass,
        idusergroup: userIdGroup,
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        if (responseJson == 'successed') {
          setWaitDone(true);
          setError(false);
        } else if (responseJson == 'failed') {
          setTitleAlert('Tên tài khoản đã tồn tại, vui lòng chọn tên khác!');
          setWaitDone(true);
          setError(true);
          setCheckAcc(false);
          setStatusAcc(false);
        }
      })
      .catch((error) => {
        setWaitDone(true);
        setError(true);
      });
  };

  const getDataUserGroup = async () => {
    setVisibleButtonLoading(true);
    if (listItemDropDown == null || listItemDropDown == '') {
      await _getAllUserGroupFromAPI();
    } else {
      setVisibleButtonLoading(false);
      setVisibleOverlay(!visibleOverlay);
    }
  };

  const check = () => {
    if (userIdGroup !== '') {
      setStatusIdGroup(true);
    }
  };

  useEffect(() => {
    check();
  });

  return (
    <ScrollView>
      <View style={styles.parent}>
        <HeaderCustom title="Tạo tài khoản" navigationHeader={navigation} />
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={{padding: '3%'}}>
            <View>
              <View style={styles.card_title}>
                <ScalableText style={styles.text_card}>
                  THÔNG TIN TÀI KHOẢN
                </ScalableText>
              </View>
              <View
                style={[
                  styles.view_card,
                  {
                    padding: '3%',
                  },
                ]}>
                <View>
                  <View>
                    <ScalableText style={styles.text_input}>
                      Khách hàng
                    </ScalableText>
                    <Button
                      buttonStyle={[
                        styles.btn,
                        {
                          backgroundColor: '#fff',
                          borderColor: '#309045',
                          borderWidth: 1,
                        },
                      ]}
                      loading={visibleButtonLoading}
                      loadingProps={{color: '#309045'}}
                      titleStyle={{color: '#309045'}}
                      title={nameIdGroup}
                      type="outline"
                      onPress={() => {
                        getDataUserGroup();
                      }}
                    />
                  </View>
                  <ScalableText style={styles.text_input}>
                    Tên tài khoản
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập tên tài khoản"
                    type={1}
                    value={userAcc}
                    check={checkAcc}
                    keyCheck="Tên tài khoản"
                    codeCheck={check_Content}
                    onChangeText={setUserAcc}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Mật khẩu
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập mật khẩu"
                    type={1}
                    value={userPass}
                    check={checkPass}
                    keyCheck="Mật khẩu"
                    codeCheck={check_Content}
                    onChangeText={setUserPass}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Nhập lại mật khẩu
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập lại mật khẩu"
                    type={1}
                    value={userCheckPass}
                    check={checkCheckPass}
                    keyCheck="Nhập lại mật khẩu"
                    codeCheck={check_Content}
                    onChangeText={setUserCheckPass}
                  />
                </View>
              </View>
            </View>
            <View>
              <Button
                buttonStyle={styles.btn}
                title="Tạo tài khoản"
                disabled={visible_Button()}
                onPress={() => {
                  setTitleAlert('Tạo tài khoản');
                  setWaitDone(false);
                  setError(false);
                  setVisibleAlert(true);
                  _AddAccount();
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <Overlay
        isVisible={visibleOverlay}
        overlayStyle={{
          width: '80%',
          height: '90%',
          borderRadius: 10,
          elevation: 0,
          padding: 0,
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            elevation: 2,
            width: '100%',
            height: '10%',
            backgroundColor: '#309045',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ScalableText
            style={{color: '#fff', fontWeight: 'bold', fontSize: 17}}>
            Chọn khách hàng
          </ScalableText>
        </View>
        <View
          style={{
            height: '77%',
            paddingHorizontal: '3%',
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 2,
          }}>
          <FlatList
            data={listItemDropDown}
            ListHeaderComponent={<View style={{marginBottom: '3%'}} />}
            ListFooterComponent={<View style={{marginTop: '3%'}} />}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setNameIdGroup(item.name);
                  setUserIdGroup(item.id);
                  setVisibleOverlay(!visibleOverlay);
                }}
                style={[
                  styles.btn,
                  {
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    padding: '1%',
                    borderWidth: 1,
                    borderColor: '#309045',
                    marginVertical: '1%',
                  },
                ]}>
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="business" size={30} color="#309045" />
                </View>
                <View
                  style={{
                    width: '80%',
                    height: '100%',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}>
                  <ScalableText
                    numberOfLines={2}
                    style={{color: '#309045', fontWeight: 'bold'}}>
                    {item.name}
                  </ScalableText>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: '13%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => setVisibleOverlay(!visibleOverlay)}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              elevation: 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              padding: '1%',
            }}>
            <Icon name="close" size={30} color="#309045" />
          </TouchableOpacity>
        </View>
      </Overlay>
      <Wait
        show={visibleAlert}
        setShow={setVisibleAlert}
        title={titleAlert}
        waitDone={waitDone}
        setWaitDone={setWaitDone}
        error={error}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  view_avatar: {
    padding: '5%', //20
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    height: Response_Size('hg', 1, 40, 18.5),
    backgroundColor: '#309045',
    borderRadius: 10,
  },
  view_card: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: '3%',
    borderRadius: 15,
    elevation: 1,
  },
  card_title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3%',
  },
  text_card: {fontSize: 20, color: '#309045', fontWeight: 'bold'},
  text_input: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
});

export default AddAccount_Screen;
