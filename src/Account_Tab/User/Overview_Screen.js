/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {Card} from 'react-native-elements';
import DateTime from '../../Components/DateTime';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import Input from '../../Components/Input';
import HeaderCustom from '../../Components/Header_Custom';
import DataNull from '../../Components/DataNull';
import GetDate from '../../Components/GetDate';
import TextS from '../../Components/TextS';
import host from '../../Server/host';
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

const Overview_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const [visibleLoadMoreLoading, setVisibleLoadMoreLoading] = useState(false);

  const [data, setData] = useState(route.params.data);
  const [noDataContent, setNoDataContent] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);
  const [page, setPage] = useState(1);
  const [limitItem, setLimitItem] = useState(5);
  const [listItem, setListItem] = useState(null);

  const listItemDropDown = [
    {
      dropDown_title: 'Hôm nay',
      dropDown_value: GetDate('YYYY-MM-DD'),
    },
    {
      dropDown_title: 'Trong tháng',
      dropDown_value: GetDate('YYYY-MM'),
    },
    {
      dropDown_title: 'Trong năm',
      dropDown_value: GetDate('YYYY'),
    },
    {
      dropDown_title: 'Tất cả',
      dropDown_value: '',
    },
  ];
  const [keyWords, setKeyWords] = useState(data.title);
  const [keyWordValue, setKeyWordValue] = useState(data.date_in);
  const [visibleLoading, setVisibleLoading] = useState(false);

  useEffect(() => {
    wait();
  });
  const wait = async () => {
    if (listItem == null || visibleLoading == true) {
      await _searchUserOverviewFromAPI();
    }
    setVisible(false);
  };
  const _searchUserOverviewFromAPI = () => {
    return fetch(host.userOverview, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        overview: true,
        idusergroup: data.idGroup,
        date_in: keyWordValue,
        truct_no: searchValue,
        page: page,
        limit: limitItem,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(
        //   moment(responseJson.data[0].createtime).format('YYYY-MM-DD HH:mm:ss'),
        //   moment('2022-12-13 21:45:16').format('DD/MM/YYYY HH:mm'),
        // );
        // console.log(responseJson.check);
        setVisibleLoading(false);
        switch (responseJson.check) {
          case 'notfull':
            if (listItem == null) {
              setListItem(responseJson.data);
            } else {
              setListItem(listItem.concat(responseJson.data));
            }
            setSearchCheck(false);
            setPage(page + 1);
            setVisibleLoadMoreLoading(false);
            setVisibleLoadMore(true);
            break;
          case 'full':
            if (listItem == null) {
              setListItem(responseJson.data);
            } else {
              setListItem(listItem.concat(responseJson.data));
            }
            setSearchCheck(true);
            setVisibleLoadMore(false);
            break;
          case 'maxfull':
            setSearchCheck(true);
            setVisibleLoadMore(false);
            setListItem('');
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
      <View style={styles.view_img}>
        {/* <Image source={{uri: item.img}} style={styles.img} /> */}
        <Image
          source={require('../../Images/icons8-note-96.png')}
          style={styles.img}
        />
      </View>
      <View style={[styles.view_content, {width: '70%'}]}>
        <TextS text={DataNull(item.customer_name)} />
        <TextS text={DataNull(item.truct_no)} style={{color: 'gray'}} />
        <TextS text={DataNull(item.items_name)} style={{color: 'gray'}} />
        <TextS text={item.price_total + ' đồng'} style={{color: 'red'}} />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TextS
            text={DataNull(DateTime(item.createtime))}
            style={{color: 'gray'}}
          />
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
          <HeaderCustom
            navigationHeader={navigation}
            title="Danh sách phiếu"
            visibleSearch={true}
            searchPlaceHolder="Tìm phiếu"
            value={searchValue}
            onChangeText={setSearchValue}
            searchCode={() => {
              setPage(1);
              setListItem(null);
              setNoDataContent(null);
            }}
          />
          <View style={{flex: 1, paddingHorizontal: '1.5%'}}>
            <FlatList
              data={listItem}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={listItem}
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
                  _searchUserOverviewFromAPI();
                } // setListItems(list);
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
                          source={require('../Images/loading/Spin-1s-200px.gif')}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setVisibleLoadMoreLoading(true);
                            _SearchPhieuCan();
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
    backgroundColor: '#309045',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10,
    color: 'yellow',
  },
  view_content: {
    width: '70%',
    height: '100%',
    padding: '2%', //10
  },
});

export default Overview_Screen;
