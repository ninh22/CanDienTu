import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Header, Card, Image, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import TextS from '../../Components/TextS';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import HeaderCustom from '../../Components/Header_Custom';

const Components = ({navigationComponents}) => {
  const [search, setSearch] = useState('');
  // const [test, setTest] = useState(false);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name:
        'Nguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van ANguyen Van AANguyen Van ANguyen Van A',
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
        navigationComponents.navigate('detailuserscreen', {
          item: item,
          // test: test,
        });
      }}>
      <Avatar
        rounded
        size="large"
        source={{
          uri: item.img,
        }}
      />
      <TextS text={item.name} style={{fontWeight: 'bold', fontSize: 15}} />
      <TextS text={item.acc} style={{color: 'gray', fontSize: 13}} />
    </TouchableOpacity>
  );

  // useEffect(() => {
  //   test ? alert(123) : null;
  // });

  return (
    <View style={styles.parent}>
      <HeaderCustom
        navigationHeader={navigationComponents}
        title="Danh sách Khách hàng"
        visibleSearch={true}
        searchPlaceHolder="Tìm tên khách hàng"
        value={search}
        onChangeText={setSearch}
      />
      <View style={{flex: 1}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      </View>
    </View>
  );
};

const ListUser_Screen = ({navigation}) => {
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
      code={<Components navigationComponents={navigation} />}
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
    width: '49%',
    height: Response_Size('hg', 0, 21), //140
    padding: '3%', //10
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    marginVertical: '1%', //10
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default ListUser_Screen;
