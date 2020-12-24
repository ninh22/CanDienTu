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
import {Avatar, ListItem, Button, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import host from '../../Server/host';

const options = {
  title: 'Chọn hình',
  takePhotoButtonTitle: 'Chụp hình',
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
  cancelButtonTitle: 'Thoát',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const AddAccount_Screen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [visibleButtonLoading, setVisibleButtonLoading] = useState(false);
  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const [imageData, setImageData] = useState('');
  const [imageName, setImageName] = useState('');
  const [icon, setIcon] = useState('');

  const [titleAlert, setTitleAlert] = useState('Tạo tài khoản');
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [waitDone, setWaitDone] = useState(false);
  const [error, setError] = useState(false);

  const [userImg, setUserImg] = useState('');
  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userSex, setUserSex] = useState('Chọn khách hàng');
  const [userNumber, setUserNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userWebsites, setUserWebsites] = useState('');

  const [userAcc, setUserAcc] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userCheckPass, setUserCheckPass] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const [checkName, setCheckName] = useState(true);
  const [statusName, setStatusName] = useState(false);

  const [checkDate, setCheckDate] = useState(true);
  const [statusDate, setStatusDate] = useState(false);

  const [checkNumber, setCheckNumber] = useState(true);
  const [statusNumber, setStatusNumber] = useState(false);

  const [checkAddress, setCheckAddress] = useState(true);
  const [statusAddress, setStatusAddress] = useState(false);

  const [checkAcc, setCheckAcc] = useState(true);
  const [statusAcc, setStatusAcc] = useState(false);

  const [checkPass, setCheckPass] = useState(true);
  const [statusPass, setStatusPass] = useState(false);

  const [checkCheckPass, setCheckCheckPass] = useState(true);
  const [statusCheckPass, setStatusCheckPass] = useState(false);

  const [checkEmail, setCheckEmail] = useState(true);
  const [statusEmail, setStatusEmail] = useState(false);

  const [checkWebsites, setCheckWebsites] = useState(true);
  const [statusWebsites, setStatusWebsites] = useState(false);

  const [listItemDropDown, setListItemDropDown] = useState(null);

  const _PickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setUserImg(source.uri);
        setImageData(response.data);
        setImageName(response.fileName);
      }
    });
  };
  const image_Null = () => {
    if (imageData == '') {
      return require('../../Images/icons8_person_96.png');
    } else {
      return {
        uri: userImg,
      };
    }
  };

  const check_Content = (content, keyCheck) => {
    switch (keyCheck) {
      case 'Họ và tên':
        if (content == '') {
          RNToasty.Error({
            title: 'Tài khoản không được để trống',
          });
          setCheckName(false);
          setStatusName(false);
        } else {
          setCheckName(true);
          setStatusName(true);
        }
        break;
      case 'Ngày sinh':
        if (content == '') {
          RNToasty.Error({
            title: 'Ngày sinh không được để trống',
          });
          setCheckDate(false);
          setStatusDate(false);
        } else {
          setCheckDate(true);
          setStatusDate(true);
        }
        break;
      case 'Số điện thoại':
        if (content == '') {
          RNToasty.Error({
            title: 'Số điện thoại không được để trống',
          });
          setCheckNumber(false);
          setStatusNumber(false);
        } else {
          setCheckNumber(true);
          setStatusNumber(true);
        }
        break;
      case 'Địa chỉ':
        if (content == '') {
          RNToasty.Error({
            title: 'Địa chỉ không được để trống',
          });
          setCheckAddress(false);
          setStatusAddress(false);
        } else {
          setCheckAddress(true);
          setStatusAddress(true);
        }
        break;
      case 'Tên tài khoản':
        if (content == '') {
          RNToasty.Error({
            title: 'Tên tài khoản không được để trống',
          });
          setCheckAcc(false);
          setStatusAcc(false);
        } else {
          setCheckAcc(true);
          setStatusAcc(true);
        }
        break;
      case 'Mật khẩu':
        if (content == '') {
          RNToasty.Error({
            title: 'Mật khẩu không được để trống',
          });
          setCheckPass(false);
          setStatusPass(false);
        } else if (userCheckPass !== '' && content !== userCheckPass) {
          RNToasty.Error({
            title: 'Mật khẩu phải giống nhau',
          });
          setCheckCheckPass(false);
          setStatusCheckPass(false);
        } else if (userCheckPass == '') {
          setStatusCheckPass(false);
        } else {
          setCheckPass(true);
          setStatusPass(true);
          setCheckCheckPass(true);
          setStatusCheckPass(true);
        }
        break;
      case 'Nhập lại mật khẩu':
        if (content !== userPass) {
          RNToasty.Error({
            title: 'Mật khẩu phải giống nhau',
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
      case 'Email':
        if (content == '') {
          RNToasty.Error({
            title: 'Email không được để trống',
          });
          setCheckEmail(false);
          setStatusEmail(false);
        } else {
          setCheckEmail(true);
          setStatusEmail(true);
        }
        break;
      case 'Websites':
        if (content == '') {
          RNToasty.Error({
            title: 'Websites không được để trống',
          });
          setCheckWebsites(false);
          setStatusWebsites(false);
        } else {
          setCheckWebsites(true);
          setStatusWebsites(true);
        }
        break;
    }
  };

  const visible_Button = () => {
    return statusDate && statusAcc && statusPass && statusCheckPass
      ? // statusName &&
        // statusEmail &&
        // statusNumber &&
        // statusAddress &&
        // statusWebsites
        false
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
        // if (responseJson == 'successed') {
        //   Alert.alert(
        //     'Thông báo',
        //     'Thêm thành công!'
        //     [
        //       {
        //         text: 'Xác nhận',
        //         style: 'cancel',
        //       },
        //     ],
        //   );
        // }
      })
      .catch((error) => {
        // console.error(error);
        RNToasty.Error({
          title: 'Lỗi',
        });
        // Alert.alert('Thông báo', 'Thêm thất bại!', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
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
        idusergroup: userDate,
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson == 'successed') {
          setWaitDone(true);
          setError(false);
          // RNToasty.Success({
          //   title: 'Thêm tài khoản thành công',
          // });
        } else if (responseJson == 'failed') {
          setTitleAlert('Tên tài khoản đã tồn tại, vui lòng chọn tên khác!');
          setWaitDone(true);
          setError(true);
          setCheckAcc(false);
          setStatusAcc(false);
          // RNToasty.Success({
          //   title: 'Thêm tài khoản thành công',
          // });
        }
        // if (responseJson == 'successed') {
        //   Alert.alert(
        //     'Thông báo',
        //     'Thêm thành công!'
        //     [
        //       {
        //         text: 'Xác nhận',
        //         style: 'cancel',
        //       },
        //     ],
        //   );
        // }
      })
      .catch((error) => {
        // console.error(error);
        setWaitDone(true);
        setError(true);
        // RNToasty.Error({
        //   title: 'Thêm thất bại',
        // });
        // Alert.alert('Thông báo', 'Thêm thất bại!', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
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
    if (userDate !== '') {
      setStatusDate(true);
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
          {/* <View backgroundColor="#309045" style={styles.view_avatar}>
            <Avatar
              rounded
              size="xlarge"
              showAccessory={true}
              accessory={{
                name: imageData ? 'pencil' : 'plus',
                type: 'material-community',
                style: {},
              }}
              onAccessoryPress={() => _PickImage()}
              source={image_Null()}
            />
          </View> */}
          <View style={{padding: '3%'}}>
            {/* <View
            // style={styles.view_card}
            >
              <View style={styles.card_title}>
                <ScalableText style={styles.text_card}>
                  THÔNG TIN KHÁCH HÀNG
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
                  <ScalableText style={styles.text_input}>
                    Họ và tên
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập họ và tên"
                    type={1}
                    value={userName}
                    check={checkName}
                    keyCheck="Họ và tên"
                    codeCheck={check_Content}
                    onChangeText={setUserName}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Ngày sinh
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    date={userDate}
                    setDate={setUserDate}
                    type={0}
                    keyCheck="Ngày sinh"
                    check={checkDate}
                    codeCheck={check_Content}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Giới tính
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    type={2}
                    dropDown_TextSelected={userSex}
                    setDropDown_TextSelected={setUserSex}
                    dropDown_List={listItemDropDown}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Số điện thoại
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập số điện thoại"
                    type={1}
                    keyboardType="phone-pad"
                    value={userNumber}
                    check={checkNumber}
                    keyCheck="Số điện thoại"
                    codeCheck={check_Content}
                    onChangeText={setUserNumber}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>Địa chỉ</ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập địa chỉ"
                    type={1}
                    value={userAddress}
                    check={checkAddress}
                    keyCheck="Địa chỉ"
                    codeCheck={check_Content}
                    onChangeText={setUserAddress}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Websites
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập websites"
                    type={1}
                    value={userWebsites}
                    check={checkWebsites}
                    keyCheck="Websites"
                    codeCheck={check_Content}
                    onChangeText={setUserWebsites}
                  />
                </View>
              </View>
            </View> */}
            <View
            // style={styles.view_card}
            >
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
                      title={userSex}
                      type="outline"
                      onPress={() => {
                        // setVisibleOverlay(!visibleOverlay);
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
        }}
        // onBackdropPress={() => setVisibleOverlay(!visibleOverlay)}
      >
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
                  setUserSex(item.name);
                  setUserDate(item.id);
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
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // backgroundColor: '#309045',
  },
  text_card: {fontSize: 20, color: '#309045', fontWeight: 'bold'},
  text_input: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: '2%',
  },
});

export default AddAccount_Screen;
