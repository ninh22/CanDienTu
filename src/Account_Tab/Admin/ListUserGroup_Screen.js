/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getUserGroupAction, loadMoreUserGroupAction} from '../../Redux/index';
import host from '../../Server/host';

import {RNToasty} from 'react-native-toasty';
import {Header, Card, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import HeaderCustom from '../../Components/Header_Custom';

const ListUserGroup_Screen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const [visibleLoadMoreLoading, setVisibleLoadMoreLoading] = useState(false);

  // const [noData, setNoData] = useState(false);
  const [noDataContent, setNoDataContent] = useState(null);
  let list = useSelector((state) => state.userGroupReducer);
  // const [page, setPage] = useState(1);
  const [limitItem, setLimitItem] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  const [search, setSearch] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);
  const dispatch = useDispatch();
  const getUserGroup = (item) => dispatch(getUserGroupAction(item));
  const loadMoreUserGroup = (item) => dispatch(loadMoreUserGroupAction(item));
  {
    /*const _getUserGroupFromAPI = () => {
    return fetch(host.getUsersGroup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page: page,
        limit: limitItem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);//Test
        switch (responseJson.check) {
          case 'notfull':
            if (list == null) {
              getUserGroup(responseJson.data);
            } else {
              loadMoreUserGroup(responseJson.data);
            }
            setPage(page + 1);
            setVisibleLoadMoreLoading(false);
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (list == null) {
              getUserGroup(responseJson.data);
            } else {
              loadMoreUserGroup(responseJson.data);
            }
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setVisibleLoadMore(false);
            getUserGroup('');
            // setNoData(true);
            setNoDataContent('Không có dữ liệu');
            break;
        }
        // if (responseJson.check == 'notfull') {
        //   getUserGroup(responseJson.data);
        // }
      })
      .catch((error) => {
        // console.error(error);//Test
        // setNoData(true);
        setNoDataContent('Lỗi');
        RNToasty.Warn({
          title: 'Lỗi',
        });
        // Alert.alert('Thông báo', 'Lỗi', [
        //   {
        //     text: 'Xác nhận',
        //     style: 'cancel',
        //   },
        // ]);
      });
  };*/
  }
  const _searchUserGroupFromAPI = () => {
    return fetch(host.searchUsersGroup, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: search,
        page: pageSearch,
        limit: limitItem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.check);
        switch (responseJson.check) {
          case 'notfull':
            if (list == null) {
              getUserGroup(responseJson.data);
            } else {
              loadMoreUserGroup(responseJson.data);
            }
            setSearchCheck(false);
            setPageSearch(pageSearch + 1);
            setVisibleLoadMoreLoading(false);
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (list == null) {
              getUserGroup(responseJson.data);
            } else {
              loadMoreUserGroup(responseJson.data);
            }
            setSearchCheck(true);
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setSearchCheck(true);
            setVisibleLoadMore(false);
            getUserGroup('');
            // setNoData(true);
            setNoDataContent('Không có dữ liệu');
            break;
        }
        // if (responseJson.check == 'notfull') {
        //   getUserGroup(responseJson.data);
        // }
      })
      .catch((error) => {
        // console.error(error);
        // setNoData(true);
        setNoDataContent('Lỗi');
        RNToasty.Warn({
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
  const _retrieveData = async () => {
    // if (list == null && searchCheck == false) {
    //   await _getUserGroupFromAPI();
    // } else if (list == null && searchCheck == true) {
    //   await _searchUserGroupFromAPI();
    // }
    if (list == null) {
      await _searchUserGroupFromAPI();
    }
    setVisible(false);
  };
  useEffect(() => {
    _retrieveData();
  });

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.parent_item}
      onPress={() => {
        navigation.navigate('usergroupinfoscreen', {
          // item: item,
          index: index,
        });
      }}>
      <Avatar
        rounded
        size="large"
        source={require('../../Images/icons8-user-account-96.png')}
      />
      <TextS
        text={item.name}
        style={{fontWeight: 'bold', fontSize: 15, marginTop: '1%'}}
      />
    </TouchableOpacity>
  );
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
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
            searchCode={() => {
              setPageSearch(1);
              getUserGroup(null);
              setNoDataContent(null);
              // if (search == '') {
              //   setPage(1);
              //   setSearchCheck(false);
              // } else {
              //   setPageSearch(1);
              //   setSearchCheck(true);
              // }
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
            }}>
            {/* <Button
              style={{width: '100%', height: 50}}
              title="123"
              onPress={() => {
                setPageSearch(1);
                setSearchCheck(true);
                getUserGroup(null);
                // _searchUserGroupFromAPI();
              }}
            />
            <Button
              style={{width: '100%', height: 50}}
              title="234"
              onPress={() => {
                setPage(1);
                setSearchCheck(false);
                getUserGroup(null);
                // _searchUserGroupFromAPI();
              }}
            /> */}
            <FlatList
              data={list}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              extraData={list}
              ListEmptyComponent={
                <View
                  style={{
                    width: Response_Size('wd', 0, 100),
                    height: Response_Size('hg', 0, 90),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {noDataContent ? (
                    <ScalableText style={{fontSize: 17, marginBottom: '3%'}}>
                      Không có dữ liệu
                    </ScalableText>
                  ) : (
                    <Image
                      style={{
                        width: 50, //30
                        height: 50, //30
                        // tintColor: '#309045',
                      }}
                      source={require('../../Images/loading/Spin-1s-200px.gif')}
                    />
                  )}
                </View>
              }
              onEndReached={() => {
                if (searchCheck == false) {
                  _searchUserGroupFromAPI();
                }
                // setListItems(list);
              }}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                <View style={{padding: '1%'}}>
                  {visibleLoadMore ? (
                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          width: 40, //30
                          height: 40, //30
                          // tintColor: '#309045',
                        }}
                        source={require('../../Images/loading/Spin-1s-200px.gif')}
                      />
                    </View>
                  ) : null}
                  {/* {visibleLoadMore ? (
                    <View
                      style={{
                        width: '100%',
                        height: Response_Size('hg', 0, 5),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {visibleLoadMoreLoading ? (
                        <Image
                          style={{
                            width: 40, //30
                            height: 40, //30
                            // tintColor: '#309045',
                          }}
                          source={require('../../Images/loading/Spin-1s-200px.gif')}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setVisibleLoadMoreLoading(true);
                            _searchUserGroupFromAPI();
                            // searchCheck
                            //   ? _searchUserGroupFromAPI()
                            //   : _getUserGroupFromAPI();
                          }}>
                          <ScalableText
                            style={{
                              color: '#309045',
                              fontWeight: 'bold',
                              fontSize: 17,
                            }}>
                            Xem thêm
                          </ScalableText>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : null} */}
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

export default ListUserGroup_Screen;
