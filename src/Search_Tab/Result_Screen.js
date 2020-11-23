import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Card, Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import HeaderCustom from '../Components/Header_Custom';
import TextS from '../Components/TextS';

const Components = ({navigationComponents}) => {
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
        navigationComponents.navigate('resultdetailscreen', {
          item: item,
        });
      }}>
      <View style={styles.view_img}>
        <Image source={{uri: item.img}} style={styles.img} />
      </View>
      <View style={styles.view_content}>
        <TextS text={item.title} />
        <TextS text={item.seri_car} style={{color: 'gray'}} />
        <TextS text={item.stuff} style={{color: 'gray'}} />
        <TextS text={item.money + ' đồng'} style={{color: 'red'}} />
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <TextS text="3 giờ trước" style={{color: 'gray'}} />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.parent}>
      <HeaderCustom
        navigationHeader={navigationComponents}
        title="Danh sách phiếu"
      />
      <View style={{flex: 1, paddingHorizontal: '1.5%'}}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const Result_Screen = ({navigation}) => {
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
    width: '100%',
    height: Response_Size('hg', 0, 16), //110
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    marginVertical: '1%',
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
    padding: '2%', //10
  },
});

export default Result_Screen;
