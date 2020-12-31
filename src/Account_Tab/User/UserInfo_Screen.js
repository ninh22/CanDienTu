/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import HeaderCustom from '../../Components/Header_Custom';
import BottomSheetCustom from '../../Components/BottomSheet_Custom';
import Loading_Screen from '../../Components/Loading_Screen';

const List = ({lists}) => {
  return (
    <View>
      {lists.map((l, i) => (
        <ListItem
          key={i}
          bottomDivider
          title={l.title}
          titleStyle={{fontWeight: 'bold'}}
          rightElement={
            <ScalableText style={{width: '60%', textAlign: 'right'}}>
              {l.content}
            </ScalableText>
          }
        />
      ))}
    </View>
  );
};

const Components = ({navigationComponents, dataRoute, onBackRefresh}) => {
  const [isVisible, setIsVisible] = useState(false);
  const listBottomSheet = [
    {
      title: 'Đổi mật khẩu',
      icon: 'lock-closed',
      onPress: () => {
        navigationComponents.navigate('userchangepasswordscreen', {
          password: '123',
        });
        setIsVisible(false);
      },
    },
  ];
  const listItem = [
    {
      title: 'Họ và tên',
      content: 'Nguyen Van A',
    },
    {
      title: 'Ngày sinh',
      content: '1990-10-20',
    },
    {
      title: 'Giới tính',
      content: 'Nam',
    },
    {
      title: 'Số điện thoại',
      content: '092584687',
    },
    {
      title: 'Địa chỉ',
      content: 'Tp. Buôn Ma Thuật',
    },
    {
      title: 'Email',
      content: 'VanA@gmail.com',
    },
  ];
  return (
    <ScrollView>
      <View style={styles.parent}>
        <HeaderCustom
          title="Thông tin Tài khoản"
          navigationHeader={navigationComponents}
          // onBackRefresh={onBackRefresh.state.params.test(true)}
          rightComponent={
            <Icon
              name="ellipsis-vertical"
              size={30}
              color="#fff"
              onPress={() => setIsVisible(true)}
            />
          }
        />
        <View style={{width: '100%', height: '100%'}}>
          <View backgroundColor="#309045" style={styles.view_avatar}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri:
                  'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
              }}
            />
            <TextS
              text="Nguyenvana"
              style={{
                color: '#fff',
                fontSize: 15,
                marginTop: '3%', //10
              }}
            />
          </View>
          <List lists={listItem} />
        </View>
      </View>
      <BottomSheetCustom
        visible={isVisible}
        setVisible={setIsVisible}
        title="Tuỳ chọn"
        listItem={listBottomSheet}
      />
    </ScrollView>
  );
};

const UserInfo_Screen = ({navigation, route}) => {
  const [item, setItem] = useState('');
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
      code={
        <Components
          navigationComponents={navigation}
          dataRoute={item}
          // onBackRefresh={route}
        />
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

export default UserInfo_Screen;
