import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Header, Card, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Product_Screen = ({navigation, route}) => {
  const [keyProduct, setKeyProduct] = useState(route.params.product);
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

  const checkData = (key) => {
    if (key == 'SẢN PHẨM') {
      return DATA;
    } else if (key == 'DỊCH VỤ') {
      return DATA2;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.parent}>
        <Header
          leftComponent={
            <TouchableOpacity
              style={{borderRadius: 50}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="chevron-back-outline" size={35} color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: keyProduct,
            style: {color: '#fff', fontSize: 20},
          }}
          // rightComponent={{icon: 'home', color: '#fff'}}
          backgroundColor="#309045"
          containerStyle={{elevation: 7}}
        />
        <View style={{flex: 1}}>
          <FlatList
            data={checkData(keyProduct)}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            ListHeaderComponent={<View style={{height: 10}}></View>}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  view_item: {
    width: '49%',
    height: 250,
    marginBottom: 10,
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

export default Product_Screen;
