import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ScalableText from 'react-native-text';
import Input from '../../Components/Input';
import HeaderCustom from '../../Components/Header_Custom';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import {RNToasty} from 'react-native-toasty';
import {Avatar, ListItem, Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

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

const AddUser_Screen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [imageData, setImageData] = useState('');
  const [imageName, setImageName] = useState('');
  const [icon, setIcon] = useState('');

  const [userImg, setUserImg] = useState('');
  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [userSex, setUserSex] = useState('Nam');
  const [userNumber, setUserNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');

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

  const listItemDropDown = [
    {
      dropDown_Item: 'Nam',
    },
    {
      dropDown_Item: 'Nữ',
    },
  ];

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
        } else {
          setCheckPass(true);
          setStatusPass(true);
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
    }
  };

  const visible_Button = () => {
    return statusName &&
      statusDate &&
      statusNumber &&
      statusAddress &&
      statusAcc &&
      statusPass &&
      statusCheckPass &&
      statusEmail
      ? false
      : true;
  };

  return (
    <ScrollView>
      <View style={styles.parent}>
        <HeaderCustom title="Thêm khách hàng" navigationHeader={navigation} />
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View backgroundColor="#309045" style={styles.view_avatar}>
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
          </View>
          <View style={{padding: '3%'}}>
            <View
            // style={styles.view_card}
            >
              <View style={styles.card_title}>
                <ScalableText style={styles.text_card}>
                  THÔNG TIN NGƯỜI DÙNG
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
              </View>
            </View>
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
                <View>
                  <ScalableText style={styles.text_input}>Email</ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập Email"
                    type={1}
                    keyboardType="email-address"
                    value={userEmail}
                    check={checkEmail}
                    keyCheck="Email"
                    codeCheck={check_Content}
                    onChangeText={setUserEmail}
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
                  alert(123);
                }}
              />
            </View>
          </View>
        </View>
      </View>
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

export default AddUser_Screen;
