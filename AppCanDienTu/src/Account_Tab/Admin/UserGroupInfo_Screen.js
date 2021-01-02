/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserAction, getNumAccAction} from '../../Redux/index';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import DataNull from '../../ScriptFile/DataNull';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import HeaderCustom from '../../Components/Header_Custom';
import Loading_Screen from '../../Components/Loading_Screen';
import host from '../../Server/host';
import DateTime from '../../ScriptFile/DateTime';
import {RNToasty} from 'react-native-toasty';

const List = ({lists}) => {
  return (
    <View>
      {lists.map((l, i) => (
        <ListItem
          key={i}
          onPress={l.onPress}
          bottomDivider
          title={l.title + ':'}
          titleStyle={{fontWeight: 'bold', color: 'gray'}}
          rightElement={
            <ScalableText style={{width: '60%', textAlign: 'right'}}>
              {l.show ? l.content : DataNull(l.content)}
            </ScalableText>
          }>
          {false || l.show ? (
            <ListItem.Chevron color="#309045" size={25} />
          ) : null}
        </ListItem>
      ))}
    </View>
  );
};

const UserGroupInfo_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(null);
  let index = route.params.index;
  let item = useSelector((state) => state.userGroupReducer[index]);
  let numAcc = useSelector((state) => state.numAccReducer);
  const dispatch = useDispatch();
  const nullItem = (item) => dispatch(getUserAction(item));
  const getnumAcc = (item) => dispatch(getNumAccAction(item));
  const _getUserGroupFromAPI = () => {
    return fetch(host.countUsersOfUsersGroup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idusergroup: item.id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // setCount(responseJson);
        getnumAcc(responseJson);
      })
      .catch((error) => {
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  const getData = async () => {
    await _getUserGroupFromAPI();
    if (numAcc !== null) setVisible(false);
  };
  useEffect(() => {
    getData();
  });
  const listItem = [
    {
      title: 'Địa chỉ',
      content: item.address,
    },
    {
      title: 'Số điện thoại',
      content: item.phonenumber,
    },
    {
      title: 'Ngày hết hạn',
      content: DateTime(item.enddate),
    },
    {
      title: 'Số lượng tài khoản',
      content: numAcc,
      show: true,
      onPress: () => {
        nullItem(null);
        navigation.navigate('listuserscreen', {idUsers: item.id});
      },
    },
  ];
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={
        <ScrollView>
          <View style={styles.parent}>
            <HeaderCustom
              title="Thông tin khách hàng"
              navigationHeader={navigation}
            />
            <View style={{width: '100%', height: '100%'}}>
              <View backgroundColor="#309045" style={styles.view_avatar}>
                <Avatar
                  rounded
                  size="xlarge"
                  source={require('../../Images/icons8-user-account-96.png')}
                />
                <TextS
                  text={item.name}
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginTop: '3%', //10
                  }}
                />
              </View>
              <List lists={listItem} />
            </View>
          </View>
        </ScrollView>
      }
    />
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
});

export default UserGroupInfo_Screen;
