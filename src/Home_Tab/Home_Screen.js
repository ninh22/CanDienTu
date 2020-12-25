/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper-hooks';
import ScalableText from 'react-native-text';
import CallButton from '../Components/CallButton';

const Home_Screen = ({ navigation, route }) => {
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
      title: 'Cân đồng hồ điện tửCân đồng hồ điện tử',
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
      title: 'Dịch vụ sửa cân bànDịch vụ sửa cân bàn',
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

  const listItem_Service = [
    {
      title: 'DỊCH VỤ KHÁCH HÀNG 24/7',
      image: require('../Images/Service/headphones-1.png'),
    },
    {
      title: 'ĐẢM BẢO HOÀN TIỀN',
      image: require('../Images/Service/guarantee.png'),
    },
    {
      title: 'MIỄN PHÍ VẬN CHUYỂN',
      image: require('../Images/Service/package.png'),
    },
  ];

  const ListItem = (items) => {
    return (
      <View style={styles.view_card}>
        <View style={styles.card_title}>
          <ScalableText style={{ color: '#309045', fontSize: 20 }}>
            {items.title}
          </ScalableText>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() =>
              navigation.navigate('product', {
                product: items.title,
              })
            }>
            <ScalableText style={{ color: '#A5A5A5', fontSize: 15 }}>
              Xem thêm
            </ScalableText>
            <Icon name="chevron-forward" size={25} color="#A5A5A5" />
          </TouchableOpacity>
        </View>
        <View style={styles.view_list}>
          {items.data}
          {/* <FlatList
            data={items.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          /> */}
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.view_item}
      onPress={() => {
        navigation.navigate(
          'productdetail',
          // , {
          //   item: item,
          // }
        );
      }}>
      <View style={styles.item_view_img}>
        <Image source={{ uri: item.img }} style={styles.item_img} />
      </View>
      <View style={styles.item_view_title}>
        <ScalableText style={styles.item_title} numberOfLines={2}>
          {item.title}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );

  const _renderList = () => {
    let listData = [
      {
        title: 'cân xe tải quốc hưng',
        titleSub:
          'Cân xe tải Quốc Hưng cung cấp cho Bạn các giải pháp cân xe đáng tin cậy, bền bỉ hoạt động tôt trong môi trường công nghiệp khắc khe',
        // img: require('./Images/qhs.jpg'),
        img: {
          uri:
            'https://candientuquochung.com/wp-content/uploads/2019/04/qhs.jpg',
        },
      },
      {
        title: 'CÂN SÀN ĐIỆN TỬ',
        titleSub:
          'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng.',
        // img: require('./Images/qhs.jpg'),
        img: {
          uri:
            'https://candientuquochung.com/wp-content/uploads/2020/10/banner-can-san-1400x510.jpg',
        },
      },
      {
        title: 'Cân kỹ thuật',
        titleSub:
          'Với nhiều sản phẩm cân Kỹ thuật, cân Phân tích được nhập khẩu trực tiếp, đáp ứng được các yêu cầu kỹ thuật và quy định đo lường Việt Nam',
        // img: require('./Images/qhs.jpg'),
        img: {
          uri:
            'https://candientuquochung.com/wp-content/uploads/2020/10/mobile-picking-solution-mps-700-1400x510.jpg',
        },
      },
    ];
    return listData.map((item, idx) => (
      <View
        style={{
          width: Dimensions.get('window').width,
          height: '100%',
          backgroundColor: '#309045',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={idx}>
        <Image source={item.img} style={styles.img} />
        <View style={styles.img_view_title}>
          <ScalableText
            style={[
              styles.img_title,
              {
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: '1%',
              },
            ]}>
            {item.title.toUpperCase()}
          </ScalableText>
          <ScalableText
            style={[
              styles.img_title,
              {
                fontSize: 15,
              },
            ]}>
            {item.titleSub}
          </ScalableText>
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.parent}>
          {/* <View style={styles.view_img}>
            <Swiper
              height={200}
              autoplay={true}
              loop={true}
              paginationSelectedColor={'#CCFF66'}
              showPagination={true}>
              {_renderList()}
            </Swiper>
          </View> */}
          <View style={{justifyContent:"center",alignItems:"center",backgroundColor:"white",marginBottom:5}}>
            <Image resizeMode={"center"}
              source={require('../Images/logo2.png')}
              style={{height:200,width:200}}></Image>
          </View>

          <ListItem
            title="SẢN PHẨM"
            // data={DATA}
            data={
              <Swiper
                height="100%" //200
                autoplay={true}
                loop={true}
                paginationSelectedColor={'#CCFF66'}
                showPagination={true}>
                {_renderList()}
              </Swiper>
            }
          />
          <ListItem
            title="DỊCH VỤ"
            // data={DATA2}
            data={
              <View
                style={[
                  styles.view_img,
                  { height: '100%', justifyContent: 'space-between' },
                ]}
                backgroundColor="#1F502A">
                <View style={styles.ServiceView_1}>
                  <ScalableText
                    style={[
                      styles.img_title,
                      {
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginBottom: '1%',
                      },
                    ]}>
                    DỊCH VỤ VÀ HỖ TRỢ
                  </ScalableText>
                  <ScalableText
                    style={[
                      styles.img_title,
                      {
                        fontSize: 15,
                      },
                    ]}>
                    Bảo dưỡng, Hổ trợ, Sửa chữa các loại cân điện tử tại khu vực
                    5 tỉnh Tây Nguyên và các tỉnh lân cận khác
                  </ScalableText>
                </View>
                <View
                  style={{
                    width: '50%',
                    height: '1%',
                    backgroundColor: '#63856A',
                  }}
                />
                <View style={styles.ServiceView_2}>
                  {listItem_Service.map((l, i) => (
                    <View style={styles.ServiceView_Item}>
                      <View style={styles.ServiceView_Image}>
                        <Image
                          source={l.image}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </View>
                      <ScalableText
                        style={[
                          styles.img_title,
                          {
                            fontWeight: 'bold',
                            fontSize: 13,
                          },
                        ]}>
                        {l.title}
                      </ScalableText>
                    </View>
                  ))}
                </View>
              </View>
            }
          />
          <View style={{marginBottom:10}}>
            <View style={styles.view_img} backgroundColor="#309045">
              <Image
                source={{
                  uri:
                    'https://cdn.pixabay.com/photo/2020/05/18/13/19/landscape-5186249_960_720.jpg',
                }}
                style={[styles.img, { opacity: 0.7 }]}></Image>
              <View style={styles.img_view_title}>
                <ScalableText
                  style={[
                    styles.img_title,
                    {
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginBottom: '1%',
                    },
                  ]}>
                  CÂN ĐIỆN TỬ QUỐC HƯNG
              </ScalableText>
                <ScalableText
                  style={[
                    styles.img_title,
                    {
                      fontSize: 15,
                    },
                  ]}>
                  Cung cấp đa dạng và phù hợp với hoạt động kinh doanh của khách
                  hàng
              </ScalableText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <CallButton />
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
    height: Response_Size('hg', 0, 30),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    // opacity: 0.7,
  },
  img_view_title: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1%',
  },
  img_title: {
    color: '#fff',
    textAlign: 'center',
  },
  view_card: {
    width: '100%',
    height: Response_Size('hg', 0, 50),
    backgroundColor: '#fff',
    marginBottom: '3%',
  },
  card_title: {
    height: Response_Size('hg', 1, 50, 15),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '1.5%',
  },
  view_list: {
    height: Response_Size('hg', 1, 50, 85),
    paddingBottom: '1.5%',
    // paddingHorizontal: '1.5%',
    // paddingRight: 0,
  },
  view_item: {
    width: Response_Size('wd', 0, 43),
    height: '100%',
    marginHorizontal: 5,
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
    padding: '2%',
  },
  item_title: {
    color: '#309045',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  ServiceView_1: {
    height: '49.5%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '3%',
  },
  ServiceView_2: {
    paddingTop: '3%',
    height: '49.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ServiceView_Item: {
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ServiceView_Image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    padding: '5%',
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: '5%',
  },
});

export default Home_Screen;
