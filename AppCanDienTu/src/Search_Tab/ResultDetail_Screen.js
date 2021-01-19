/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import DateTime from '../ScriptFile/DateTime';
import HeaderCustom from '../Components/Header_Custom';
import {ListItem} from 'react-native-elements';
import DataNull from '../ScriptFile/DataNull';
import Loading_Screen from '../Components/Loading_Screen';
import ScalableText from 'react-native-text';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import Money from '../ScriptFile/Money';

const List = ({lists}) => {
  return (
    <View>
      {lists.map((l, i) => (
        <ListItem
          key={i}
          onPress={l.onPress}
          bottomDivider
          title={l.title + ':'}
          titleStyle={[
            {color: 'gray', fontWeight: 'bold'},
            false || l.money ? {color: 'red'} : null,
          ]}
          rightElement={
            false || l.money ? (
              <ScalableText
                style={{
                  width: '60%',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                {DataNull(l.content, l.money)} Đồng
              </ScalableText>
            ) : false || l.weight ? (
              <ScalableText
                style={{width: '60%', textAlign: 'right', fontWeight: 'bold'}}>
                {DataNull(l.content)} Kg
              </ScalableText>
            ) : (
              <ScalableText style={{width: '60%', textAlign: 'right'}}>
                {DataNull(l.content)}
              </ScalableText>
            )
          }
        />
      ))}
    </View>
  );
};

const Components = ({navigationComponents, dataRoute}) => {
  const listItem = [
    {
      title: 'Xe số',
      content: dataRoute.truct_no,
    },
    {
      title: 'Khách hàng',
      content: dataRoute.customer_name,
    },
    {
      title: 'Ngày nhập cân',
      content: DateTime(dataRoute.date_in),
    },
    {
      title: 'Ngày xuất cân',
      content: DateTime(dataRoute.date_out),
    },
    {
      title: 'Hàng hoá',
      content: dataRoute.items_name,
    },
    {
      title: 'Trọng lượng toàn bộ',
      content: Money(dataRoute.net_weight),
      weight: true,
    },
    {
      title: 'Trọng lượng xe',
      content: Money(dataRoute.weight_1),
      weight: true,
    },
    {
      title: 'Trọng lượng hàng hoá',
      content: Money(dataRoute.weight_2),
      weight: true,
    },
    {
      title: 'Tiền cân',
      content: Money(dataRoute.price_total),
      money: true,
    },
    {
      title: 'Ghi chú',
      content: dataRoute.notes,
    },
  ];
  return (
    <ScrollView>
      <View style={styles.parent}>
        <HeaderCustom
          navigationHeader={navigationComponents}
          title="Chi tiết phiếu"
        />
        <View style={styles.imgView}>
          <Image
            style={styles.img}
            resizeMode="stretch"
            source={require('../Images/Logo/500px/bootsplash_logo.png')}
          />
        </View>
        <List lists={listItem} />
      </View>
    </ScrollView>
  );
};

const ResultDetail_Screen = ({navigation, route}) => {
  const [item, setItem] = useState(route.params.item);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={<Components navigationComponents={navigation} dataRoute={item} />}
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  imgView: {
    width: '100%',
    height: Response_Size('hg', 0, 30), //300
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: Response_Size('wd', 0, 95), //350
    height: Response_Size('hg', 1, 40, 40), //100
  },
});

export default ResultDetail_Screen;
