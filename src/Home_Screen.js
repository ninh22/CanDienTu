/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card, Button, Badge} from 'react-native-elements';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Home_Screen = ({navigation, route}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cân xe tải',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candientuquochung3.gif',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbantan.gif',
    },
  ];

  const DATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dịch vụ sửa cân ô tô',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Dịch vụ sửa cân bàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Dịch vụ sửa cân kỹ thuật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Dịch vụ sửa cân treo',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.view_item}
      // onPress={() => {
      //   navigation.navigate('Product', {
      //     item: item,
      //   });
      // }}
    >
      <View style={styles.item_view_img}>
        <Image source={{uri: item.img}} style={styles.item_img} />
      </View>
      <View style={styles.item_view_title}>
        <Text style={styles.item_title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.parent}>
          <View style={styles.view_img} backgroundColor="#309045">
            <Image
              source={require('./Images/qhs.jpg')}
              style={styles.img}></Image>
            <View style={styles.img_view_title}>
              <Text
                style={[
                  styles.img_title,
                  {
                    fontWeight: 'bold',
                    fontSize: 30,
                  },
                ]}>
                CÂN ĐIỆN TỬ QUỐC HƯNG
              </Text>
              <Text
                style={[
                  styles.img_title,
                  {
                    fontSize: 17,
                  },
                ]}>
                Cung cấp đa dạng và phù hợp với hoạt động kinh doanh của khách
                hàng
              </Text>
            </View>
          </View>
          <View style={styles.view_card}>
            <View style={styles.card_title}>
              <Text style={{color: '#309045', fontSize: 20}}>SẢN PHẨM</Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('Product', {
                    product: 'SẢN PHẨM',
                  })
                }>
                <Text style={{color: '#A5A5A5', fontSize: 15}}>Xem thêm</Text>
                <Icon name="chevron-forward" size={25} color="#A5A5A5" />
              </TouchableOpacity>
            </View>
            <View style={styles.view_list}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>
          </View>
          <View style={styles.view_card}>
            <View style={styles.card_title}>
              <Text style={{color: '#309045', fontSize: 20}}>DỊCH VỤ</Text>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() =>
                  navigation.navigate('Product', {
                    product: 'DỊCH VỤ',
                  })
                }>
                <Text style={{color: '#A5A5A5', fontSize: 15}}>Xem thêm</Text>
                <Icon name="chevron-forward" size={25} color="#A5A5A5" />
              </TouchableOpacity>
            </View>
            <View style={styles.view_list}>
              <FlatList
                data={DATA2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  view_img: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  img_view_title: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img_title: {
    color: '#fff',
    textAlign: 'center',
  },
  view_card: {
    width: '100%',
    height: 330,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  card_title: {
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  view_list: {
    height: 280,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  view_item: {
    width: 170,
    height: '100%',
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'white',
  },
  item_view_img: {
    height: '80%',
  },
  item_img: {
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item_view_title: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  item_title: {
    color: '#309045',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Home_Screen;
