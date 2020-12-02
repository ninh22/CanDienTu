/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {Image, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import ScalableText from 'react-native-text';
import HeaderCustom from '../Components/Header_Custom';
import CallButton from '../Components/CallButton';

const Components = ({navigationComponents, dataRoute}) => {
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
      title:
        'Cân bàn nhỏCân bàn nhỏCân bàn nhỏCân bàn nhỏCân bàn nhỏCân bàn nhỏCân bàn nhỏ',
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
  const DATA_TYPE = [
    {
      id: '0',
      title: 'Cân xe tải',
    },
    {
      id: '1',
      title: 'Cân nông sản',
    },
    {
      id: '2',
      title: 'Cân bàn',
    },
    {
      id: '3',
      title: 'Cân sàn',
    },
    {
      id: '4',
      title: 'Cân kỹ thuật',
    },
    {
      id: '5',
      title: 'Cân phân tích',
    },
    {
      id: '6',
      title: 'Cân chuyên dùng',
    },
    {
      id: '7',
      title: 'Cân treo - Cân móc cẩu',
    },
    {
      id: '8',
      title: 'Cân tự động',
    },
    {
      id: '9',
      title: 'Thiết bị và phụ kiện',
    },
    {
      id: '10',
      title: 'Dụng cụ nông sản',
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
  const DATA2_TYPE = [
    {
      id: '0',
      title: 'Sửa chữa cân xe tải',
    },
    {
      id: '1',
      title: 'Sửa chữa cân bàn điện tử',
    },
    {
      id: '2',
      title: 'Sửa cân kỹ thuật',
    },
    {
      id: '3',
      title: 'Sửa cân treo',
    },
    {
      id: '4',
      title: 'Dịch vụ hiệu chuẩn - Kiểm định cân điện tử',
    },
    {
      id: '5',
      title: 'Dịch vụ tháo dỡ cân xe tải',
    },
    {
      id: '6',
      title: 'Dịch vụ vận chuyển di dời trạm cân xe tải',
    },
  ];

  const [search, setSearch] = useState('');

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.view_item}
      onPress={() => {
        navigationComponents.navigate(
          'productdetail',
          // , {
          //   item: item,
          // }
        );
      }}>
      <View style={styles.item_view_img}>
        <Image source={{uri: item.img}} style={styles.item_img} />
      </View>
      <View style={styles.item_view_title}>
        <ScalableText style={styles.item_title} numberOfLines={2}>
          {item.title}
        </ScalableText>
      </View>
      <View style={styles.item_view_titleSub}>
        <ScalableText style={styles.item_titleSub} numberOfLines={2}>
          {item.title}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );
  const renderItem_Type = ({item}) => (
    <Button
      buttonStyle={styles.btn}
      titleStyle={{color: '#309045'}}
      title={item.title}
      type="outline"
      onPress={() => {
        alert(item.title);
      }}
    />
  );

  const checkData = (key) => {
    if (key == 'SẢN PHẨM') {
      return DATA;
    } else if (key == 'DỊCH VỤ') {
      return DATA2;
    }
  };

  const checkData_Type = (key) => {
    if (key == 'SẢN PHẨM') {
      return DATA_TYPE;
    } else if (key == 'DỊCH VỤ') {
      return DATA2_TYPE;
    }
  };

  return (
    <View style={styles.parent}>
      <HeaderCustom
        navigationHeader={navigationComponents}
        title={dataRoute}
        visibleSearch={true}
        searchPlaceHolder="Tìm tên sản phẩm"
        value={search}
        onChangeText={setSearch}
      />
      <View
        style={{
          height: Response_Size('hg', 0, 7),
          marginVertical: '1%',
        }}>
        <FlatList
          data={checkData_Type(dataRoute)}
          renderItem={renderItem_Type}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{width: '100%', height: '100%', paddingHorizontal: '1.5%'}}>
        <FlatList
          data={checkData(dataRoute)}
          renderItem={renderItem}
          // numColumns={2}
          // columnWrapperStyle={styles.row}
          // ListHeaderComponent={<View style={{height: '1%'}}></View>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <CallButton />
    </View>
  );
};

const Product_Screen = ({navigation, route}) => {
  const [keyProduct, setKeyProduct] = useState(route.params.product);
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
      code={
        <Components navigationComponents={navigation} dataRoute={keyProduct} />
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
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  view_item: {
    width: '100%', //49%
    height: Response_Size('hg', 1, 71, 100),
    marginBottom: '3%',
    borderRadius: 10,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'white',
  },
  item_view_img: {
    height: '50%',
  },
  item_img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  item_view_title: {
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: '2%',
  },
  item_view_titleSub: {
    height: '35%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: '2%',
  },
  item_title: {
    color: '#309045',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item_titleSub: {
    fontSize: 17,
    // textAlign: 'center',
  },
  btn: {
    backgroundColor: 'white',
    borderColor: '#309045',
    borderWidth: 1,
    height: '100%',
    borderRadius: 10,
    marginHorizontal: 5,
  },
});

export default Product_Screen;
