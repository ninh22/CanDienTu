import React, {useEffect} from 'react';
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

const Result_Screen = ({navigation}) => {
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
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bf',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bg',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
      title: 'Bê tông Đại Đồng',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://nhaxevanchuyen.com/wp-content/uploads/2016/04/cho-thue-xe-tai-cho-hang-hai-phong.jpg',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parent_item}
      onPress={() => {
        navigation.navigate('resultdetailscreen', {
          item: item,
        });
      }}>
      <View style={styles.view_img}>
        <Image source={{uri: item.img}} style={styles.img} />
      </View>
      <View style={styles.view_content}>
        <Text numberOfLines={1}>{item.title}</Text>
        <Text style={{color: 'gray'}} numberOfLines={1}>
          {item.seri_car}
        </Text>
        <Text style={{color: 'gray'}} numberOfLines={1}>
          {item.stuff}
        </Text>
        <Text style={{color: 'red'}} numberOfLines={1}>
          {item.money} Đồng
        </Text>
        <View style={{width: '100%', alignItems: 'flex-end'}} numberOfLines={1}>
          <Text style={{color: 'gray'}}>3 giờ trước</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            text: 'Danh sách phiếu',
            style: {color: '#fff', fontSize: 20},
          }}
          // rightComponent={{icon: 'home', color: '#fff'}}
          backgroundColor="#309045"
          containerStyle={{elevation: 7}}
        />
        <View style={{flex: 1, padding: 15}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
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
  parent_item: {
    width: '100%',
    height: 110,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    marginBottom: 10,
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
    padding: 10,
  },
});

export default Result_Screen;
