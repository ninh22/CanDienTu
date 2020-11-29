/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUserAction, loadMoreUserAction} from '../../Redux/index';
import host from '../../Server/host';

import {RNToasty} from 'react-native-toasty';
import {Header, Card, Image, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import TextS from '../../Components/TextS';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import HeaderCustom from '../../Components/Header_Custom';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name:
      'Nguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van AANguyen Van ANguyen Van A',
    acc:
      'NguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvana',
    pass: '123',
    img:
      'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
    number: '092584687',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    name: 'Nguyen Van A',
    acc: 'Nguyenvana',
    pass: '123',
    img:
      'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
    number: '092584687',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
    name: 'Nguyen Van A',
    acc: 'Nguyenvana',
    pass: '123',
    img:
      'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
    number: '092584687',
  },
];

const ListUser_Screen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noDataContent, setNoDataContent] = useState(null);
  let list = useSelector((state) => state);
  let [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const getUser = (item) => dispatch(getUserAction(item));
  const loadMoreUser = (item) => dispatch(loadMoreUserAction(item));
  const _getUserFromAPI = () => {
    return fetch(host.getCustomer, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: page,
        limit: limit,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.check);
        switch (responseJson.check) {
          case 'notfull':
            if (list == null) {
              getUser(responseJson.data);
            } else {
              loadMoreUser(responseJson.data);
            }
            setPage((page += 1));
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (list == null) {
              getUser(responseJson.data);
            } else {
              loadMoreUser(responseJson.data);
            }
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setVisibleLoadMore(false);
            setNoData(true);
            setNoDataContent('Quay về màn hình trước');
            console.log('No data');
            break;
        }
        // if (responseJson.check == 'notfull') {
        //   getUser(responseJson.data);
        // }
      })
      .catch((error) => {
        console.error(error);
        setNoData(true);
        setNoDataContent('Lỗi');
        // RNToasty.Error({
        //   title: 'Lỗi',
        // });
        // Alert.alert('Thông báo', 'Lỗi', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
      });
  };
  // const _getUserFromAPI = () => {
  //   return fetch(host.getUser)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       getUser(json);
  //     })
  //     .catch((error) => {
  //       Alert.alert(
  //         'Thông báo',
  //         'Lỗi kết nối',
  //         [
  //           {
  //             text: 'Cancel',
  //             onPress: () => {
  //               navigation.goBack();
  //             },
  //             style: 'cancel',
  //           },
  //           {text: 'OK', onPress: _getUserFromAPI},
  //         ],
  //         {cancelable: false},
  //       );
  //     });
  // };
  const _retrieveData = async () => {
    if (list == null) {
      await _getUserFromAPI();
    }
    setVisible(false);
  };
  useEffect(() => {
    _retrieveData();
    console.log(list);
    console.log(page);
  });

  const image_Null = (uri) => {
    if (uri == '' || uri == undefined || uri == null) {
      return require('../../Images/icons8_person_96.png');
    } else {
      return {
        uri: uri,
      };
    }
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.parent_item}
      onPress={() => {
        navigation.navigate('detailuserscreen', {
          // item: item,
          index: index,
        });
      }}>
      <Avatar rounded size="large" source={image_Null(item.img)} />
      <TextS text={item.name} style={{fontWeight: 'bold', fontSize: 15}} />
    </TouchableOpacity>
  );
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      noData={noData}
      noDataContent={noDataContent}
      navigation={navigation}
      code={
        <View style={styles.parent}>
          <HeaderCustom
            navigationHeader={navigation}
            title="Danh sách Khách hàng"
            visibleSearch={true}
            searchPlaceHolder="Tìm tên khách hàng"
            value={search}
            onChangeText={setSearch}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              extraData={list}
              // onEndReached={() => {
              //   loadMoreUser(DATA);
              //   // setListItems(list);
              // }}
              // onEndReachedThreshold={0}
              ListFooterComponent={
                // <View
                //   style={{
                //     width: '100%',
                //     height: 40,
                //     alignItems: 'center',
                //     justifyContent: 'center',
                //   }}>
                //   <Image
                //     style={{
                //       width: 40, //30
                //       height: 40, //30
                //       // tintColor: '#309045',
                //     }}
                //     source={require('../../Images/loading/Spin-1s-200px.gif')}
                //   />
                // </View>
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {visibleLoadMore ? (
                    <Button
                      title="123"
                      onPress={() => {
                        _getUserFromAPI();
                        // loadMoreUser(DATA);
                      }}
                    />
                  ) : null}
                </View>
              }
            />
          </View>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  parent_item: {
    width: Response_Size('wd', 0, 48), // 48%
    height: Response_Size('hg', 0, 17), //140 //21
    padding: '3%', //10
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    margin: '1%', //10
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
});

export default ListUser_Screen;
