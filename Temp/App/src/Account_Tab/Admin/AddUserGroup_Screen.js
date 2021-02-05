/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ScalableText from 'react-native-text';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Wait from '../../Components/Wait';
import Input from '../../Components/Input';
import HeaderCustom from '../../Components/Header_Custom';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import {RNToasty} from 'react-native-toasty';
import {Avatar, ListItem, Button, Overlay} from 'react-native-elements';
import host from '../../Server/host';
import Regex from '../../ScriptFile/Regex';

const CustomRenderItem = ({item, onPress}) => {
  const {btn_Custom, view_item, txt_item} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, btn_Custom]}>
      <View
        style={[
          view_item,
          {
            width: '20%',
            alignItems: 'center',
          },
        ]}>
        <MaterialCommunityIcons name="weight" size={30} color="#309045" />
      </View>
      <View
        style={[
          view_item,
          {
            width: '80%',
            alignItems: 'flex-start',
          },
        ]}>
        <ScalableText numberOfLines={2} style={txt_item}>
          {item.name}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );
};

const OverlayCustom = ({visible, setVisible, data, onPress, idCustom}) => {
  const {
    overlayStyle,
    view_titleOverlay,
    txt_titleOverlay,
    view_FlatList,
    view_exitButton,
    touchable_exitButton,
  } = styles;
  return (
    <Overlay isVisible={visible} overlayStyle={overlayStyle}>
      <View style={view_titleOverlay}>
        <ScalableText style={txt_titleOverlay}>Chọn kiểu cân</ScalableText>
      </View>
      <View style={view_FlatList}>
        <FlatList
          data={data}
          ListHeaderComponent={<View style={{marginBottom: '3%'}} />}
          ListFooterComponent={<View style={{marginTop: '3%'}} />}
          renderItem={onPress}
          keyExtractor={idCustom}
        />
      </View>
      <View style={view_exitButton}>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={touchable_exitButton}>
          <Icon name="close" size={30} color="#309045" />
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

const AddUserGroup_Screen = ({navigation}) => {
  const [visibleButtonLoading, setVisibleButtonLoading] = useState(false);
  const [visibleButtonLoading2, setVisibleButtonLoading2] = useState(false);

  const [visibleOverlay, setVisibleOverlay] = useState(false);
  const [visibleOverlay2, setVisibleOverlay2] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [waitDone, setWaitDone] = useState(false);
  const [error, setError] = useState(false);

  const [userName, setUserName] = useState('');
  const [userDate, setUserDate] = useState('');
  const [typeName, setTypeName] = useState('Chọn kiểu cân');
  const [typeName2, setTypeName2] = useState('Chọn loại cân');
  const [userNumber, setUserNumber] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [iDType, setIDType] = useState('');
  const [iDType2, setIDType2] = useState('');

  const [checkName, setCheckName] = useState(true);
  const [statusName, setStatusName] = useState(false);

  const [checkDate, setCheckDate] = useState(true);
  const [statusDate, setStatusDate] = useState(false);

  const [checkNumber, setCheckNumber] = useState(true);
  const [statusNumber, setStatusNumber] = useState(false);

  const [checkAddress, setCheckAddress] = useState(true);
  const [statusAddress, setStatusAddress] = useState(false);

  const [statusType, setStatusType] = useState(false);
  const [statusType2, setStatusType2] = useState(false);

  const [listItemDropDown, setListItemDropDown] = useState(null);
  const [listItemDropDown2, setListItemDropDown2] = useState(null);

  const check_Content = (content, keyCheck) => {
    switch (keyCheck) {
      case 'Tên':
        if (Regex(content, 'name') == false) {
          RNToasty.Error({
            title:
              'Tên khách hàng cần ít nhất 2 kí tự và không chứa kí tự đặc biệt',
            duration: 1,
          });
          setCheckName(false);
          setStatusName(false);
        } else {
          setCheckName(true);
          setStatusName(true);
        }
        break;
      case 'Ngày hết hạn':
        if (content == '') {
          RNToasty.Error({
            title: 'Ngày hết hạn không được để trống',
            duration: 1,
          });
          setCheckDate(false);
          setStatusDate(false);
        } else {
          setCheckDate(true);
          setStatusDate(true);
        }
        break;
      case 'Số điện thoại':
        if (Regex(content, 'phonenumber') == false) {
          RNToasty.Error({
            title: 'Số điện thoại phải từ 10 đến 11 chữ số',
            duration: 1,
          });
          setCheckNumber(false);
          setStatusNumber(false);
        } else {
          setCheckNumber(true);
          setStatusNumber(true);
        }
        break;
      case 'Địa chỉ':
        if (Regex(content, 'address') == false) {
          RNToasty.Error({
            title: 'Địa chỉ cần ít nhất 3 kí tự',
            duration: 1,
          });
          setCheckAddress(false);
          setStatusAddress(false);
        } else {
          setCheckAddress(true);
          setStatusAddress(true);
        }
        break;
    }
  };

  const visible_Button = () => {
    return statusName &&
      statusDate &&
      statusNumber &&
      statusAddress &&
      statusType &&
      statusType2
      ? false
      : true;
  };

  const _AddUsersGroup = () => {
    return fetch(host.addUsersGroup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        phonenumber: userNumber,
        address: userAddress,
        enddate: userDate,
        idweight_apptype: iDType,
        idapp_types: iDType2,
      }),
    })
      .then((response) => response.text())
      .then((responseJson) => {
        if (responseJson == 'successed') {
          setWaitDone(true);
          setError(false);
        }
      })
      .catch((error) => {
        setWaitDone(true);
        setError(true);
      });
  };

  const _getAllWeightAppTypeFromAPI = () => {
    return fetch(host.getAllWeightAppType, {
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
        // console.error(error);
        RNToasty.Error({
          title: 'Lỗi',
        });
      });
  };

  const _getAllAppTypesFromAPI = () => {
    return fetch(host.getAllAppTypes, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setListItemDropDown2(responseJson);
        setVisibleButtonLoading2(false);
        setVisibleOverlay2(!visibleOverlay2);
      })
      .catch((error) => {
        // console.error(error);
        RNToasty.Error({
          title: 'Lỗi',
        });
      });
  };

  const getDataUserGroup = async () => {
    if (listItemDropDown == null || listItemDropDown == '') {
      await _getAllWeightAppTypeFromAPI();
    } else {
      setVisibleButtonLoading(false);
      setVisibleOverlay(!visibleOverlay);
    }
  };

  const getDataUserGroup2 = async () => {
    if (listItemDropDown2 == null || listItemDropDown2 == '') {
      await _getAllAppTypesFromAPI();
    } else {
      setVisibleButtonLoading2(false);
      setVisibleOverlay2(!visibleOverlay2);
    }
  };

  const check = () => {
    if (iDType !== '') {
      setStatusType(true);
    }
    if (iDType2 !== '') {
      setStatusType2(true);
    }
  };

  useEffect(() => {
    check();
  });

  return (
    <View style={styles.parent}>
      <HeaderCustom
        title="Tạo thông tin khách hàng"
        navigationHeader={navigation}
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={{padding: '3%'}}>
            <View>
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
                    Tên khách hàng
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    placeHolder="Nhập tên khách hàng"
                    type={1}
                    value={userName}
                    check={checkName}
                    keyCheck="Tên"
                    codeCheck={check_Content}
                    onChangeText={setUserName}
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
                    keyboardType="numeric"
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
                    Ngày hết hạn
                  </ScalableText>
                  <Input
                    heightParent={40}
                    heightI={18}
                    date={userDate}
                    setDate={setUserDate}
                    type={0}
                    keyCheck="Ngày hết hạn"
                    check={checkDate}
                    codeCheck={check_Content}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Kiểu cân
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
                    title={typeName}
                    type="outline"
                    onPress={() => {
                      setVisibleButtonLoading(true);
                      getDataUserGroup();
                    }}
                  />
                </View>
                <View>
                  <ScalableText style={styles.text_input}>
                    Loại cân
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
                    loading={visibleButtonLoading2}
                    loadingProps={{color: '#309045'}}
                    titleStyle={{color: '#309045'}}
                    title={typeName2}
                    type="outline"
                    onPress={() => {
                      setVisibleButtonLoading2(true);
                      getDataUserGroup2();
                    }}
                  />
                </View>
              </View>
            </View>
            <View>
              <Button
                buttonStyle={styles.btn}
                title="Tạo khách hàng"
                disabled={visible_Button()}
                onPress={() => {
                  setWaitDone(false);
                  setError(false);
                  setVisibleAlert(true);
                  _AddUsersGroup();
                }}
              />
            </View>
          </View>
        </View>
        <OverlayCustom
          visible={visibleOverlay}
          setVisible={setVisibleOverlay}
          data={listItemDropDown}
          onPress={({item}) => (
            <CustomRenderItem
              item={item}
              onPress={() => {
                setTypeName(item.name);
                setIDType(item.id);
                setVisibleOverlay(!visibleOverlay);
              }}
            />
          )}
          idCustom={(item) => item.id}
        />
        <OverlayCustom
          visible={visibleOverlay2}
          setVisible={setVisibleOverlay2}
          data={listItemDropDown2}
          onPress={({item}) => (
            <CustomRenderItem
              item={item}
              onPress={() => {
                setTypeName2(item.name);
                setIDType2(item.idapp_types);
                setVisibleOverlay2(!visibleOverlay2);
              }}
            />
          )}
          idCustom={(item) => item.idapp_types}
        />
        <Wait
          show={visibleAlert}
          setShow={setVisibleAlert}
          title="Tạo khách hàng"
          waitDone={waitDone}
          setWaitDone={setWaitDone}
          error={error}
        />
      </ScrollView>
    </View>
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
  btn_Custom: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: '1%',
    borderWidth: 1,
    borderColor: '#309045',
    marginVertical: '1%',
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
  view_item: {
    height: '100%',
    justifyContent: 'center',
  },
  txt_item: {
    color: '#309045',
    fontWeight: 'bold',
  },
  overlayStyle: {
    width: '80%',
    height: '90%',
    borderRadius: 10,
    elevation: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  view_titleOverlay: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 2,
    width: '100%',
    height: '10%',
    backgroundColor: '#309045',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt_titleOverlay: {color: '#fff', fontWeight: 'bold', fontSize: 17},
  view_FlatList: {
    height: '77%',
    paddingHorizontal: '3%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 2,
  },
  view_exitButton: {
    width: '100%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  touchable_exitButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: '1%',
  },
});

export default AddUserGroup_Screen;
