/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
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
import Icon from 'react-native-vector-icons/Ionicons';

const CheckBoxScreen = (boxs) => {
  return (
    <CheckBox
      containerStyle={{
        marginVertical: 0,
        padding: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
      }}
      title={boxs.title}
      checked={boxs.checked}
      checkedColor="#309045"
      onPress={boxs.onPress}
    />
  );
};
const DetailDiagram_Screen = ({navigation, route}) => {
  const {
    view_card_title,
    view_card,
    view_item,
    item,
    txt_bold,
    txt_center,
    view_input,
    view_checkBox,
    view_loading,
    item_border,
  } = styles;

  const [visible, setVisible] = useState(true);
  const [visibleLoadMore, setVisibleLoadMore] = useState(false);
  const data = route.params.dataDiagram;
  const [dataDiagram, setDataDiagram] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState(false);
  const [type, setType] = useState('Days');

  const [IsFocused, setIsFocused] = useState(true);
  const handleFocus = () => {
    setIsFocused(false);
  };
  const handleBlur = () => {
    setIsFocused(true);
  };
  const width = (IsFocused) => {
    return IsFocused ? '90%' : '80%'; //80%
  };
  useEffect(() => {
    wait();
  });
  const wait = async () => {
    // if (dataDiagram == '') {
    //   await _searchDiagramCustomFromAPI();
    // }
    if (dataDiagram == '') {
      await _searchDiagramCustomFromAPI();
    }
    setVisible(false);
  };
  const _searchDiagramCustomFromAPI = () => {
    return fetch(
      data.title !== 'Doanh Thu 7 Ngày Qua'
        ? host.searchDiagramProgress
        : host.searchDiagramMap,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          idusergroup: data.idGroup,
          truct_no: search,
        }),
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setDataDiagram(responseJson);
        if (visibleLoadMore == true) {
          setVisibleLoadMore(false);
        }
      })
      .catch((error) => {
        RNToasty.Warn({
          title: 'Lỗi',
        });
      });
  };
  const returnRes = (res1, res2) => {
    return data.title !== 'Doanh Thu 7 Ngày Qua' ? res1 : res2;
  };
  const titleConfig = [
    {title: type == 'Days' ? 'Ngày' : 'Tháng'},
    {title: returnRes('Hàng', 'Số Phiếu')},
    {
      title: returnRes('Trọng Lượng Hàng', 'Tổng Tiền'),
      large: true,
    },
  ];
  let dataConfig = dataDiagram.map((l, i) => {
    if (i % 2 == 0) {
      return {
        date: l.date,
        val: l.value.map((lc, ic) => {
          return {
            name: Money(lc.name),
            data: Money(lc.data),
          };
        }),
      };
    } else {
      return {
        date: l.date,
        val: l.value.map((lc, ic) => {
          return {
            name: Money(lc.name),
            data: Money(lc.data),
          };
        }),
        color: true,
      };
    }
  });
  // let dataConfig = [
  //   {
  //     date: '1/1',
  //     val: [{data: [12, 13, 14]}, {data: [200, 300, 500], sub: true}],
  //   },
  //   {
  //     date: '1/1',
  //     val: [{data: [12, 13]}, {data: [200, 500], sub: true}],
  //     color: true,
  //   },
  //   {
  //     date: '1/1',
  //     val: [{data: [14]}, {data: [500], sub: true}],
  //   },
  // ];
  const Title = ({props}) => {
    return (
      <View style={view_card_title}>
        <ScalableText style={[{fontSize: 20, color: '#309045'}, txt_bold]}>
          {props}
        </ScalableText>
      </View>
    );
  };
  const DetailDiagram = () => {
    return (
      <View style={view_card}>
        <View style={view_item}>
          {titleConfig.map((l, i) => (
            <View
              key={i}
              style={[
                item,
                {
                  width: false || l.large ? '48%' : '25%',
                  backgroundColor: '#309045',
                },
              ]}>
              <ScalableText style={[{color: '#fff'}, txt_bold, txt_center]}>
                {l.title}
              </ScalableText>
            </View>
          ))}
        </View>
        {visibleLoadMore ? (
          <View style={view_loading}>
            <Image
              style={{
                width: 40, //30
                height: 40, //30
              }}
              source={require('../../Images/loading/Spin-1s-200px.gif')}
            />
          </View>
        ) : null}
        {dataConfig.map((l, i) => (
          <View style={[view_item]} key={i}>
            <View
              style={[
                item,
                item_border,
                {
                  width: '25%',
                  height: 'auto',
                  backgroundColor: false || l.color ? '#BEBFBF' : '#E4E4E4',
                },
              ]}>
              <ScalableText>{l.date}</ScalableText>
            </View>
            {l.val == '' ? (
              <View
                style={[
                  item,
                  item_border,
                  {
                    width: '74%',
                    backgroundColor: false || l.color ? '#BEBFBF' : '#E4E4E4',
                  },
                ]}>
                <ScalableText style={txt_center}>Không có dữ liệu</ScalableText>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  height: 'auto',
                  // width: false || r.sub ? '48%' : '25%',
                  width: '74%',
                }}>
                {l.val.map((r, j) => (
                  <View
                    key={j}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      height: 'auto',
                      // width: false || r.sub ? '48%' : '25%',
                      width: '100%',
                    }}>
                    <View
                      style={[
                        item,
                        item_border,
                        {
                          width: '33.5%',
                          backgroundColor:
                            false || l.color ? '#BEBFBF' : '#E4E4E4',
                        },
                      ]}>
                      <ScalableText style={txt_center}>{r.name}</ScalableText>
                    </View>
                    <View
                      style={[
                        item,
                        item_border,
                        {
                          width: '65%',
                          height: '100%',
                          backgroundColor:
                            false || l.color ? '#BEBFBF' : '#E4E4E4',
                        },
                      ]}>
                      <ScalableText style={txt_center}>
                        {data.title !== 'Doanh Thu 7 Ngày Qua'
                          ? r.data + ' kg'
                          : r.data + ' đ'}
                      </ScalableText>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    );
  };
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={
        <ScrollView>
          <View style={styles.parent}>
            <HeaderCustom
              navigationHeader={navigation}
              title={data.title}
              // visibleSearch={true}
              // searchPlaceHolder="Tìm phiếu"
              // value={searchValue}
              // onChangeText={setSearchValue}
              // searchCode={() => {
              //   setPage(1);
              //   setListItem(null);
              //   setNoDataContent(null);
              // }}
            />
            {/* <Title props="Thông Tin Chi Tiết 7 Ngày Qua" /> */}
            {/* <Title props="Xem Theo Biển Số Xe" /> */}
            <View style={[view_card, {height: 'auto'}]}>
              {/* <View
                style={[
                  view_input,
                  {
                    borderColor: IsFocused ? '#C9CFD3' : 'green',
                    borderWidth: 1,
                  },
                ]}>
                <Icon name="search" size={25} color="#989898" />
                <TextInput
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Nhập biển số xe"
                  style={{
                    width: '90%', // width(IsFocused)
                    borderWidth: 0,
                    padding: 0,
                  }}
                  onEndEditing={() => {
                    setVisibleLoadMore(true);
                    setDataDiagram([]);
                  }}
                  underlineColorAndroid="transparent"
                  onChangeText={(text) => setSearch(text)}
                  value={search}
                />
              </View> */}
              <View style={view_checkBox}>
                <ScalableText style={[txt_bold, {color: 'gray'}]}>
                  Tuỳ Chọn:
                </ScalableText>
                <CheckBoxScreen
                  title="7 Ngày"
                  checked={!month}
                  onPress={() => {
                    setVisibleLoadMore(true);
                    setMonth(false);
                    setType('Days');
                    setDataDiagram([]);
                  }}
                />
                <CheckBoxScreen
                  title="12 Tháng"
                  checked={month}
                  onPress={() => {
                    setVisibleLoadMore(true);
                    setMonth(true);
                    setType('Months');
                    setDataDiagram([]);
                  }}
                />
              </View>
            </View>
            <DetailDiagram />
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
  view_card_title: {
    width: '100%',
    height: 'auto',
    marginTop: '2%',
    backgroundColor: '#fff',
    padding: '2%',
    paddingBottom: 0,
  },
  view_card: {
    width: '100%',
    height: 'auto', //Response_Size('hg', 0, 50) //Response_Size('hg', 0, 51)
    backgroundColor: '#fff',
    padding: '2%',
  },
  view_item: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    minHeight: Response_Size('hg', 1, 50, 12), //Response_Size('hg', 1, 50, 12)
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1,
    padding: '1.5%',
  },
  item_border: {
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: 'white',
    borderTopColor: 'white',
  },
  txt_bold: {fontWeight: 'bold'},
  txt_center: {textAlign: 'center'},
  view_input: {
    backgroundColor: 'white',
    width: '100%',
    height: Response_Size('hg', 1, 40, 18),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '2%',
    borderRadius: 10,
    elevation: 1,
  },
  btn: {
    width: '100%',
    height: Response_Size('hg', 1, 40, 18.5),
    backgroundColor: '#309045',
    borderRadius: 10,
  },
  view_checkBox: {
    width: '100%',
    height: 'auto',
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  view_loading: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2%',
  },
});

export default DetailDiagram_Screen;
