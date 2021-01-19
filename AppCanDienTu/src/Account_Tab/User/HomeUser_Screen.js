/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading_Screen from '../../Components/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import Input from '../../Components/Input';
import GetDate from '../../ScriptFile/GetDate';
import _removeData from '../../ScriptFile/Logout';
import {RNToasty} from 'react-native-toasty';
import {LineChart, ProgressChart} from 'react-native-chart-kit';
import Money from '../../ScriptFile/Money';

import host from '../../Server/host';
import moment from 'moment';

const Item = ({items}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {items.map((l, i) => (
        <TouchableOpacity
          key={i}
          onPress={l.onPress}
          style={{
            width: '48.5%',
            height: Response_Size('hg', 1, 40, 40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: '3%',
            backgroundColor: false || l.color ? '#bc4749' : '#309045',
          }}>
          <Icon name={l.nameIcon} size={30} color="#fff" />
          <ScalableText style={styles.item_txt}>{l.title}</ScalableText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ItemView = ({items, loading, navigation, data}) => {
  return (
    <View>
      {items.map((l, i) => (
        <TouchableOpacity
          key={i}
          onPress={() =>
            navigation.navigate('overviewscreen', {
              data: data,
            })
          }
          style={{
            width: '100%',
            height: Response_Size('hg', 1, 40, 45),
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1%',
            backgroundColor: '#309045',
            marginBottom: false || l.end ? null : '3%',
            borderRadius: 10,
          }}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome5 name={l.nameIcon} size={30} color="#fff" />
              <ScalableText style={[styles.item_txt, {marginVertical: '1.5%'}]}>
                {l.title}
              </ScalableText>
              <ScalableText style={styles.item_txt}>{l.number}</ScalableText>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ItemViews = ({code, title, navigation, data}) => {
  return (
    <View>
      <View style={styles.card_title}>
        <ScalableText style={styles.text_card}>{title}</ScalableText>
      </View>
      <TouchableOpacity
        disabled={navigation ? false : true}
        onPress={() =>
          navigation.navigate('detaildiagramscreen', {
            dataDiagram: {title: title, idGroup: data},
          })
        }
        style={[
          styles.item,
          {
            width: Response_Size('wd', 0, 91), //98%
            height: 'auto',
          },
        ]}>
        {code}
      </TouchableOpacity>
    </View>
  );
};

const HomeUser_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  const [visibleLoading, setVisibleLoading] = useState(false);
  const [id, setId] = useState(null);
  const [idGroup, setIdGroup] = useState(null);
  const [idWeightAppType, setIdWeightAppType] = useState(null);

  const [dataDiagramMap, setDataDiagramMap] = useState([]);
  const [dataDiagramProgress, setDataDiagramProgress] = useState([]);

  const [money, setMoney] = useState('');
  const [weight, setWeight] = useState('');
  const [total, setTotal] = useState('');
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
  const [keyWords, setKeyWords] = useState('Hôm nay');
  const [keyWordValue, setKeyWordValue] = useState(
    listItemDropDown[0].dropDown_value,
  );

  useEffect(() => {
    _retrieveData();
    // console.log(idGroup);
  });
  const setIDData = (val) => {
    if (id == null && idGroup == null) {
      if (val !== null) {
        setId(val.id);
        setIdGroup(val.idGroup);
        // We have data!!
        // console.log(value);idGroup
      } else {
        setId(route.params.id);
        setIdGroup(route.params.idGroup);
      }
    }
  };
  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('@Key');
      value = await JSON.parse(value);
      setIDData(value);
      // console.warn(value);
      // if (id == null && idGroup == null) {
      //   if (value !== null) {
      //     setId(value.id);
      //     setIdGroup(value.idGroup);
      //     // We have data!!
      //     // console.log(value);idGroup
      //   } else {
      //     setId(route.params.id);
      //     setIdGroup(route.params.idGroup);
      //   }
      // }
      if (idWeightAppType == null && idGroup !== null) {
        await _getWeightAppTypeFromAPI();
      }
      await _getUserOverviewFromAPI();
      if (dataDiagramMap == '') {
        await _getUserDiagramMapFromAPI();
      }
      if (dataDiagramProgress == '') {
        await _getUserDiagramProgressFromAPI();
      }
      setVisible(false);
    } catch (error) {
      // Error retrieving data
    }
  };
  const listItem = idWeightAppType
    ? [
        {
          title: 'Doanh Thu',
          number: Money(money) + ' VNĐ',
          nameIcon: 'coins',
        },
        {
          title: 'Trọng Lượng Hàng',
          number: Money(weight) + ' KG',
          nameIcon: 'weight-hanging',
        },
        {
          title: 'Tổng Phiếu',
          number: total,
          nameIcon: 'clipboard-list',
          end: true,
        },
      ]
    : [
        {
          title: 'Doanh thu',
          number: Money(money) + ' VNĐ',
          nameIcon: 'coins',
        },
        {
          title: 'Tổng phiếu',
          number: total,
          nameIcon: 'clipboard-list',
          end: true,
        },
      ];
  const listOption1 = [
    {
      nameIcon: 'reader',
      title: 'Phiếu',
    },
    {
      nameIcon: 'trending-up',
      title: 'Hoạt động gần đây',
    },
  ];
  const listOption2 = [
    {
      nameIcon: 'key',
      title: 'Đổi mật khẩu',
      onPress: () =>
        navigation.navigate('userchangepasswordscreen', {
          changePassword: {
            permission: 'user',
            id: id,
          },
        }),
    },
    {
      nameIcon: 'log-out',
      title: 'Đăng xuất',
      onPress: () => _removeData(navigation),
      color: true,
    },
  ];
  const data = {
    legend: [moment().format('YYYY')],
    labels: dataDiagramMap.map((l, i) => l.title),
    datasets: [
      {
        data: dataDiagramMap.map((l, i) => l.value / 1000000),
        color: () => '#bc4749', // optional //#6a994e //#bc4749
      },
    ],
  };
  const dataProgress = {
    labels: dataDiagramProgress.map((l, i) => l.name), // optional
    data: dataDiagramProgress.map((l, i) => parseFloat(l.val)),
  };
  const chartConfig = {
    backgroundGradientFrom: '#f2e8cf',
    backgroundGradientTo: '#f2e8cf',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: () => '#000',
    labelColor: () => '#000',
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: '#000',
    },
  };
  const _getWeightAppTypeFromAPI = () => {
    return fetch(host.weightAppType, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: idGroup,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        setIdWeightAppType(responseJson);
      })
      .catch((error) => {
        // console.error(error);//Test
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
  const _getUserOverviewFromAPI = () => {
    return fetch(host.userOverview, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        overview: false,
        idusergroup: idGroup,
        date_in: keyWordValue,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson, id, idGroup);
        setMoney(responseJson.money);
        setWeight(responseJson.weight);
        setTotal(responseJson.countResult);
        setVisibleLoading(false);
      })
      .catch((error) => {
        // console.error(error);//Test
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
  const _getUserDiagramMapFromAPI = () => {
    return fetch(host.userDiagramMap, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idusergroup: idGroup,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataDiagramMap(responseJson);
      })
      .catch((error) => {
        // console.error(error);
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  const _getUserDiagramProgressFromAPI = () => {
    return fetch(host.userDiagramProgress, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idusergroup: idGroup,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setDataDiagramProgress(responseJson);
      })
      .catch((error) => {
        // console.error(error);
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  return (
    <Loading_Screen
      edgesTop={true}
      visible={visible}
      code={
        <ScrollView>
          <View style={styles.parent}>
            <ItemViews
              title="Thống Kê"
              code={
                <View
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}>
                  <Input
                    heightParent={40}
                    heightI={18}
                    type={2}
                    dropDown_TextSelected={keyWords}
                    setDropDown_TextSelected={setKeyWords}
                    setDropDown_Value={setKeyWordValue}
                    dropDown_CustomOnPress={setVisibleLoading}
                    dropDown_List={listItemDropDown}
                  />
                  <ItemView
                    items={listItem}
                    loading={visibleLoading}
                    navigation={navigation}
                    data={{
                      date_in: keyWordValue,
                      idGroup: idGroup,
                      title: keyWords,
                    }}
                  />
                </View>
              }
            />
            <ItemViews
              title="Doanh Thu 7 Ngày Qua"
              navigation={navigation}
              data={idGroup}
              code={
                <LineChart
                  data={data}
                  width={Response_Size('wd', 1, 91, 93)}
                  height={300}
                  chartConfig={chartConfig}
                  yAxisSuffix=" tr"
                  bezier
                  getDotColor={() => '#fff'}
                  style={{
                    borderRadius: 10,
                  }}
                  onDataPointClick={({value}) => {
                    RNToasty.Info({
                      title: '' + Money(value * 1000000) + ' VNĐ',
                    });
                  }}
                />
              }
            />
            {idWeightAppType ? (
              <ItemViews
                title="Hàng Hoá 7 Ngày Qua"
                navigation={navigation}
                data={idGroup}
                code={
                  <ProgressChart
                    data={dataProgress}
                    width={Response_Size('wd', 1, 91, 93)}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={{
                      backgroundGradientFrom: '#309045',
                      backgroundGradientTo: '#309045',
                      decimalPlaces: 2,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 10,
                      },
                    }}
                    style={{
                      borderRadius: 10,
                    }}
                    hideLegend={false}
                  />
                }
              />
            ) : null}
            <ItemViews
              title="Tùy Chọn"
              code={
                <View
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}>
                  {/* <Item items={listOption1} />
                  <View style={{height: '5%'}} /> */}
                  <Item items={listOption2} />
                </View>
              }
            />
            {/* <View style={styles.view_item}>
              <Item
                title="Tài khoản"
                typeIcon={true}
                nameIcon="user-alt"
                onPress={() => navigation.navigate('userinfoscreen')}
              />
              <Item
                title="Đăng xuất"
                typeIcon={false}
                nameIcon="log-out"
                onPress={() => alert(123)}
              />
            </View> */}
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
    padding: '3%',
    alignItems: 'center',
  },
  view_img: {
    width: '100%',
    height: Response_Size('hg', 0, 37), //250 //37
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  img: {
    width: Response_Size('wd', 0, 90), //350
    height: Response_Size('hg', 1, 37, 40), //100
  },
  view_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  style_touchOpacity_notiIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
  view_icon_noti: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: '47%',
    height: Response_Size('hg', 1, 43, 43), //130
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    padding: '3%',
    borderRadius: 10,
    marginBottom: '3%',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 5,
    borderColor: '#C9CFD3',
    borderWidth: 1,
  },
  item_txt: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
  view_card: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#C9CFD3',
    marginBottom: '3%',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '1%',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // backgroundColor: '#309045',
  },
  text_card: {
    fontSize: 23,
    color: '#309045',
    fontWeight: 'bold',
    textAlign: 'justify',
  },
});

export default HomeUser_Screen;
