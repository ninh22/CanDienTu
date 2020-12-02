/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import HeaderCustom from '../Components/Header_Custom';
import TextS from '../Components/TextS';
import host from '../Server/host';
import ScalableText from 'react-native-text';
import {RNToasty} from 'react-native-toasty';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    seri_car: '92C-04610',
    stuff: 'Xi măng',
    money: '65,000',
    img:
      'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
    title: 'Bê tông Đại Đồng',
    seri_car: '92C-04610',
    stuff: 'Xi măng',
    money: '65,000',
    img:
      'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
  },
];

const Result_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const [noData, setNoData] = useState(false);
  const [noDataContent, setNoDataContent] = useState(null);
  const [searchValue, setSearchValue] = useState(route.params.value);
  const [page, setPage] = useState(1);
  const [limitItem, setLimitItem] = useState(5);
  const [listItem, setListItem] = useState(null);
  useEffect(() => {
    wait();
  });
  const wait = async () => {
    if (listItem == null) {
      await _SearchPhieuCan();
    }
    setVisible(false);
  };
  const _SearchPhieuCan = () => {
    return fetch(host.SearchPhieuCan, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        truct_no: searchValue,
        page: page,
        limit: limitItem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // console.log(responseJson.check);
        switch (responseJson.check) {
          case 'notfull':
            if (listItem == null) {
              setListItem(responseJson.data);
            } else {
              setListItem(listItem.concat(responseJson.data));
            }
            setPage(page + 1);
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (listItem == null) {
              setListItem(responseJson.data);
            } else {
              setListItem(listItem.concat(responseJson.data));
            }
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setVisibleLoadMore(false);
            setNoData(true);
            setNoDataContent('Không có dữ liệu');
            break;
        }
        // if (responseJson.check == 'notfull') {
        //   getUser(responseJson.data);
        // }
      })
      .catch((error) => {
        // console.error(error);
        // setNoData(true);
        // setNoDataContent('Lỗi');
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
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parent_item}
      onPress={() => {
        navigation.navigate('resultdetailscreen', {
          item: item,
        });
      }}>
      {/* <View style={styles.view_img}>
        <Image source={{uri: item.img}} style={styles.img} />
      </View> */}
      <View style={[styles.view_content, {width: '100%'}]}>
        <TextS text={item.customer_name} />
        <TextS text={item.truct_no} style={{color: 'gray'}} />
        <TextS text={item.items_name} style={{color: 'gray'}} />
        <TextS text={item.price_total1 + ' đồng'} style={{color: 'red'}} />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TextS text={item.date_in} style={{color: 'gray'}} />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={
        <View style={styles.parent}>
          <HeaderCustom navigationHeader={navigation} title="Danh sách phiếu" />
          <View style={{flex: 1, paddingHorizontal: '1.5%'}}>
            <FlatList
              data={listItem}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={listItem}
              ListEmptyComponent={
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ScalableText style={{fontSize: 17, marginBottom: '3%'}}>
                    {noDataContent}
                  </ScalableText>
                </View>
              }
              // onEndReached={() => {
              //   searchCheck ? _searchUserFromAPI() : _getUserFromAPI();
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
                <View>
                  {visibleLoadMore ? (
                    <View
                      style={{
                        width: '100%',
                        height: Response_Size('hg', 0, 5),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          _SearchPhieuCan();
                          // _getUserFromAPI();
                          // loadMoreUser(DATA);
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
    alignItems: 'center',
  },
  parent_item: {
    width: '100%',
    height: Response_Size('hg', 0, 16), //110
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    marginVertical: '1%',
    elevation: 5,
  },
  view_img: {
    width: '30%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  view_content: {
    width: '70%',
    height: '100%',
    padding: '2%', //10
  },
});

export default Result_Screen;
