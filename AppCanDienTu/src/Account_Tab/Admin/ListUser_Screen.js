/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getUserAction,
  loadMoreUserAction,
  deleteUserAction,
  reduceNumAccAction,
} from '../../Redux/index';
import host from '../../Server/host';

import {RNToasty} from 'react-native-toasty';
import {Avatar} from 'react-native-elements';
import BottomSheetCustom from '../../Components/BottomSheet_Custom';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import Loading_Screen from '../../Components/Loading_Screen';
import HeaderCustom from '../../Components/Header_Custom';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const ListUser_Screen = ({navigation, route}) => {
  const [isVisibleBSC, setIsVisibleBSC] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  const [startDelete, setStartDelete] = useState(false);
  const [loadingDone, setLoadingDone] = useState(true);
  const [error, setError] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [noDataContent, setNoDataContent] = useState(null);
  let list = useSelector((state) => state.userReducer);
  const [limitItem, setLimitItem] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  const [search, setSearch] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);
  const dispatch = useDispatch();
  const getUser = (item) => dispatch(getUserAction(item));
  const loadMoreUser = (item) => dispatch(loadMoreUserAction(item));
  const deleteUser = (item) => dispatch(deleteUserAction(item));
  const reduceNumAcc = () => dispatch(reduceNumAccAction());
  const _searchUserFromAPI = () => {
    return fetch(host.searchUsers, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idusergroup: route.params.idUsers,
        username: search,
        page: pageSearch,
        limit: limitItem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setSearchCheck(false);
        switch (responseJson.check) {
          case 'notfull':
            if (list == null) {
              getUser(responseJson.data);
            } else {
              loadMoreUser(responseJson.data);
            }
            setSearchCheck(false);
            setPageSearch(pageSearch + 1);
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (list == null) {
              getUser(responseJson.data);
            } else {
              loadMoreUser(responseJson.data);
            }
            setSearchCheck(true);
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setSearchCheck(true);
            setVisibleLoadMore(false);
            getUser('');
            setNoDataContent('Không có dữ liệu');
            break;
        }
      })
      .catch((error) => {
        setNoDataContent('Lỗi');
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  const check = (display, loading, fail, success) => {
    return startDelete
      ? loadingDone
        ? error
          ? fail
          : success
        : loading
      : display;
  };
  const _deleteUserFromAPI = () => {
    return fetch(host.deleteUsers, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'successed') {
          getUser(null);
          setPageSearch(1);
          setNoDataContent(null);
          setLoadingDone(true);
          setError(false);
          reduceNumAcc();
        }
      })
      .catch((error) => {
        setLoadingDone(true);
        setError(true);
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  const _retrieveData = async () => {
    if (list == null) {
      await _searchUserFromAPI();
    }
    setVisible(false);
  };
  useEffect(() => {
    _retrieveData();
  });
  const listBottomSheet = [
    {
      title: 'Xoá tài khoản',
      icon: 'person-remove',
      onPress: () => {
        setStartDelete(false);
        setLoadingDone(false);
        setError(false);
        setShowDelete(true);
        setIsVisibleBSC(false);
      },
    },
    {
      title: 'Đổi mật khẩu',
      icon: 'key',
      onPress: () => {
        navigation.navigate('userchangepasswordscreen', {
          changePassword: {
            permission: 'admin',
            id: id,
          },
        });
        setIsVisibleBSC(false);
      },
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.parent_item}
        onPress={() => {
          setIsVisibleBSC(true);
          setId(item.id);
          setUserName(item.username);
        }}>
        <Avatar
          rounded
          size="large"
          source={require('../../Images/icons8_person_96.png')}
        />
        <TextS
          text={item.username}
          style={{fontWeight: 'bold', fontSize: 15, marginTop: '1%'}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      navigation={navigation}
      code={
        <View style={styles.parent}>
          <HeaderCustom
            navigationHeader={navigation}
            title="Danh sách tài khoản"
            visibleSearch={true}
            searchPlaceHolder="Tìm tên tài khoản"
            value={search}
            onChangeText={setSearch}
            searchCode={() => {
              setPageSearch(1);
              getUser(null);
              setNoDataContent(null);
            }}
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
              ListEmptyComponent={
                <View style={styles.view_empty}>
                  {noDataContent ? (
                    <View style={styles.view_empty}>
                      <View style={{width: '20%', height: '20%'}}>
                        <Image
                          source={require('../../Images/icons8-empty-box-96.png')}
                          style={{height: '100%', width: '100%'}}
                        />
                      </View>
                      <ScalableText>Không có dữ liệu</ScalableText>
                    </View>
                  ) : (
                    <Image
                      style={{
                        width: 50, //30
                        height: 50, //30
                      }}
                      source={require('../../Images/loading/Spin-1s-200px.gif')}
                    />
                  )}
                </View>
              }
              onEndReached={() => {
                if (searchCheck == false) {
                  _searchUserFromAPI();
                }
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
                        }}
                        source={require('../../Images/loading/Spin-1s-200px.gif')}
                      />
                    </View>
                  ) : null}
                </View>
              }
            />
          </View>
          <BottomSheetCustom
            visible={isVisibleBSC}
            setVisible={setIsVisibleBSC}
            title="Tuỳ chọn"
            listItem={listBottomSheet}
          />
          <SCLAlert
            theme={check('danger', 'default', 'danger', 'success')}
            show={showDelete}
            title={check(
              'Bạn chắc chứ?',
              'Vui lòng chờ...',
              'Thất bại',
              'Thành công',
            )}
            headerIconComponent={check(
              <Icon name="trash" size={35} color="#fff" />,
              <Image
                style={{
                  width: 50, //30
                  height: 50, //30
                }}
                source={require('../../Images/loading/Spin-1s-200px.gif')}
              />,
              <Icon name="close-circle" size={35} color="#fff" />,
              <Icon name="checkmark-circle" size={35} color="#fff" />,
            )}
            cancellable={false}
            subtitle={'Xoá tài khoản ' + userName}>
            {startDelete ? (
              loadingDone ? (
                <SCLAlertButton
                  theme={check('danger', 'default', 'danger', 'success')}
                  onPress={() => setShowDelete(false)}>
                  Xác nhận
                </SCLAlertButton>
              ) : null
            ) : (
              <View>
                <SCLAlertButton
                  theme="danger"
                  onPress={() => {
                    setStartDelete(true);
                    _deleteUserFromAPI();
                  }}>
                  Xoá
                </SCLAlertButton>
                <SCLAlertButton
                  theme="default"
                  onPress={() => setShowDelete(false)}>
                  Huỷ
                </SCLAlertButton>
              </View>
            )}
          </SCLAlert>
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
  view_empty: {
    width: Response_Size('wd', 0, 100),
    height: Response_Size('hg', 0, 90),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListUser_Screen;
