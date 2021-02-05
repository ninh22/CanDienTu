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
  getUserGroupAction,
  loadMoreUserGroupAction,
  getNumAccAction,
} from '../../Redux/index';
import host from '../../Server/host';

import {RNToasty} from 'react-native-toasty';
import {Avatar} from 'react-native-elements';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import Loading_Screen from '../../Components/Loading_Screen';
import HeaderCustom from '../../Components/Header_Custom';

const ListUserGroup_Screen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  const [noDataContent, setNoDataContent] = useState(null);
  let list = useSelector((state) => state.userGroupReducer);
  const [limitItem, setLimitItem] = useState(10);
  const [pageSearch, setPageSearch] = useState(1);
  const [search, setSearch] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);
  const dispatch = useDispatch();
  const getUserGroup = (item) => dispatch(getUserGroupAction(item));
  const loadMoreUserGroup = (item) => dispatch(loadMoreUserGroupAction(item));
  const getnullNumAcc = (item) => dispatch(getNumAccAction(item));
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
  const _retrieveData = async () => {
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
        getnullNumAcc(null);
        navigation.navigate('usergroupinfoscreen', {
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
                  _searchUserGroupFromAPI();
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

export default ListUserGroup_Screen;
