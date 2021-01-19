/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTime from '../../ScriptFile/DateTime';
import Loading_Screen from '../../Components/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import HeaderCustom from '../../Components/Header_Custom';
import DataNull from '../../ScriptFile/DataNull';
import TextS from '../../Components/TextS';
import host from '../../Server/host';
import ScalableText from 'react-native-text';
import {RNToasty} from 'react-native-toasty';
import Money from '../../ScriptFile/Money';

const Overview_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);

  const [data, setData] = useState(route.params.data);
  const [noDataContent, setNoDataContent] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [searchCheck, setSearchCheck] = useState(false);
  const [page, setPage] = useState(1);
  const [limitItem, setLimitItem] = useState(5);
  const [listItem, setListItem] = useState(null);

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
      })
      .catch((error) => {
        RNToasty.Warn({
          title: 'Lỗi',
        });
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
        <Image
          source={{
            uri:
              'https://candientuquochung.com/wp-content/uploads/2019/04/qhs.jpg',
          }}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
      <View style={[styles.view_content, {width: '70%'}]}>
        <TextS text={DataNull(item.customer_name)} />
        <TextS text={DataNull(item.truct_no)} style={{color: 'gray'}} />
        <TextS text={DataNull(item.items_name)} style={{color: 'gray'}} />
        <TextS
          text={Money(item.price_total) + ' đồng'}
          style={{color: 'red'}}
        />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TextS
            text={DataNull(DateTime(item.date_in))}
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
                  _searchUserOverviewFromAPI();
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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
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
  view_empty: {
    width: Response_Size('wd', 0, 100),
    height: Response_Size('hg', 0, 90),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Overview_Screen;
