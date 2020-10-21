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
import {Header, Card, Image, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ListUser_Screen = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name:
        'Nguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van A',
      acc:
        'NguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvanaNguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28be',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bf',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bg',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bh',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bj',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bk',
      name: 'Nguyen Van A',
      acc: 'Nguyenvana',
      pass: '123',
      img:
        'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
      number: '092584687',
    },
  ];

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.parent_item}
      onPress={() => {
        navigation.navigate('userdetailscreen', {
          item: item,
        });
      }}>
      <Avatar
        rounded
        size="large"
        source={{
          uri: item.img,
        }}
      />
      <Text numberOfLines={1} style={{fontWeight: 'bold', fontSize: 17}}>
        {item.name}
      </Text>
      <Text style={{color: 'gray', fontSize: 15}} numberOfLines={1}>
        {item.acc}
      </Text>
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
            text: 'Danh sách Khách hàng',
            style: {color: '#fff', fontSize: 20},
          }}
          // rightComponent={{icon: 'home', color: '#fff'}}
          backgroundColor="#309045"
          containerStyle={{elevation: 7}}
        />
        <View style={{flex: 1}}>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<View style={{height: 10}}></View>}
            numColumns={2}
            columnWrapperStyle={styles.row}
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
    width: '49%',
    height: 140,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default ListUser_Screen;
