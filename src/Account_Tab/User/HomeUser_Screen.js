/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card, Button, Badge, Divider} from 'react-native-elements';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import Input from '../../Components/Input';
import _removeData from '../../Components/Logout';
import {RNToasty} from 'react-native-toasty';
import {LineChart, ProgressChart} from 'react-native-chart-kit';

const Item = ({items}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {items.map((l, i) => (
        <TouchableOpacity
          key={i}
          onPress={l.onPress}
          style={{
            width: '48.5%',
            height: Response_Size('hg', 1, 40, 35),
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

const ItemView = ({items}) => {
  return (
    <View>
      {items.map((l, i) => (
        <TouchableOpacity
          key={i}
          // onPress={() =>
          //   navigationComponents.navigate('resultscreen', {
          //     key: key,
          //   })
          // }
          style={{
            width: '100%',
            height: Response_Size('hg', 1, 40, 35),
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1%',
            backgroundColor: '#309045',
            marginBottom: false || l.end ? null : '3%',
            borderRadius: 10,
          }}>
          <ScalableText style={styles.item_txt}>{l.title}</ScalableText>
          <ScalableText style={styles.item_txt}>{l.number}</ScalableText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ItemViews = ({code, title}) => {
  return (
    <View>
      <View style={styles.card_title}>
        <ScalableText style={styles.text_card}>{title}</ScalableText>
      </View>
      <View
        style={[
          styles.item,
          {
            width: Response_Size('wd', 0, 91), //98%
            height: 'auto',
            justifyContent: 'flex-start',
          },
        ]}>
        {code}
      </View>
    </View>
  );
};

const Components = ({navigationComponents}) => {
  const [keyWords, setKeyWords] = useState('Hôm nay');
  const listItem = [
    {
      title: 'Doanh thu',
      number: '1.000.000' + ' VNĐ',
    },
    {
      title: 'Tổng phiếu',
      number: 15,
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
      nameIcon: 'person',
      title: 'Tài khoản',
    },
    {
      nameIcon: 'log-out',
      title: 'Đăng xuất',
      onPress: () => _removeData(navigationComponents),
      color: true,
    },
  ];
  const listItemDropDown = [
    {
      dropDown_Item: 'Hôm nay',
    },
    {
      dropDown_Item: 'Trong tháng',
    },
    {
      dropDown_Item: 'Trong năm',
    },
  ];
  const data = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 43],
        color: () => '#bc4749', // optional //#6a994e //#bc4749
      },
    ],
  };
  const dataProgress = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
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
  return (
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
                dropDown_List={listItemDropDown}
              />
              <ItemView items={listItem} />
            </View>
          }
        />
        <ItemViews
          title="Biểu đồ doanh thu 7 ngày qua"
          code={
            <LineChart
              data={data}
              width={Response_Size('wd', 1, 91, 93)}
              height={300}
              chartConfig={chartConfig}
              yAxisSuffix="tr"
              bezier
              getDotColor={() => '#fff'}
              style={{
                borderRadius: 10,
              }}
              onDataPointClick={({value}) => {
                RNToasty.Info({
                  title: '' + value + ' tr',
                });
              }}
            />
          }
        />
        <ItemViews
          title="Hàng hoá"
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
                  borderRadius: 16,
                },
              }}
              style={{
                borderRadius: 16,
              }}
              hideLegend={false}
            />
          }
        />
        <ItemViews
          title="Tùy chọn"
          code={
            <View
              style={{
                width: '100%',
                height: 'auto',
              }}>
              <Item items={listOption1} />
              <View style={{height: '5%'}} />
              <Item items={listOption2} />
            </View>
          }
        />
        {/* <View style={styles.view_item}>
              <Item
                title="Tài khoản"
                typeIcon={true}
                nameIcon="user-alt"
                onPress={() => navigationComponents.navigate('userinfoscreen')}
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
  );
};

const HomeUser_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={true}
      visible={visible}
      code={<Components navigationComponents={navigation} />}
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
