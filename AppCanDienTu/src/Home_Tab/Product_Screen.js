/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button} from 'react-native-elements';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import Loading_Screen from '../Components/Loading_Screen';
import ScalableText from 'react-native-text';
import HeaderCustom from '../Components/Header_Custom';
import CallButton from '../Components/CallButton';
import {
  DATA,
  LuuDATA,
  DATA_TYPE,
  DATA2,
  LuuDATA2,
  DATA2_TYPE,
} from '../ScriptFile/Data_Product';

const Components = ({navigationComponents, dataRoute}) => {
  const [search, setSearch] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.view_item}
      onPress={() => {
        navigationComponents.navigate('productdetail', {item: item});
      }}>
      <View style={styles.item_view_img}>
        <Image
          resizeMode="stretch"
          source={{uri: item.img}}
          style={styles.item_img}
        />
      </View>
      <View style={styles.item_view_title}>
        <ScalableText style={styles.item_title} numberOfLines={2}>
          {item.title}
        </ScalableText>
      </View>
      <View style={styles.item_view_titleSub}>
        <ScalableText style={{marginBottom: '1%'}}>
          Liên hệ: 02623 821 888
        </ScalableText>
        {/* <ScalableText style={styles.item_titleSub}>Mô tả:</ScalableText> */}
        <ScalableText style={styles.item_titleSub} numberOfLines={3}>
          {item.subtitle}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );

  const [keySelected, setKeySelected] = useState('All');
  const [testData, setTestData] = useState(DATA);
  const [testDataService, setTestDataService] = useState(DATA2);
  const setKey_Selected = (id) => {
    setKeySelected(id);
    setTimeout(() => {
      if (dataRoute == 'SẢN PHẨM') {
        if (id == 'All') {
          setTestData(LuuDATA);
        } else {
          var data = [];
          for (var i = 0; i < DATA.length; i++) {
            if (DATA[i].TypeID == id) {
              data.push(DATA[i]);
            }
          }
          setTestData(data);
        }
      } else if (dataRoute == 'DỊCH VỤ') {
        if (id == 'All') {
          setTestDataService(LuuDATA2);
        } else {
          var data = [];
          for (var i = 0; i < DATA2.length; i++) {
            if (DATA2[i].TypeID == id) {
              data.push(DATA2[i]);
            }
          }
          setTestDataService(data);
        }
      }
      setShowLoading(false);
    }, 500);
  };
  const setKey_Search = (key) => {
    setTimeout(() => {
      if (dataRoute == 'SẢN PHẨM') {
        var data = [];
        DATA.map((l, i) => {
          if (l.title.search(key) != -1) {
            data.push(DATA[i]);
          }
        });
        setTestData(data);
      } else if (dataRoute == 'DỊCH VỤ') {
        var data = [];
        DATA2.map((l, i) => {
          if (l.title.search(key) != -1) {
            data.push(DATA2[i]);
          }
        });
        setTestDataService(data);
      }
      setShowLoading(false);
    }, 500);
  };
  const renderItem_Type = ({item}) => (
    <Button
      buttonStyle={[
        styles.btn,
        {backgroundColor: keySelected == item.id ? 'green' : 'white'},
      ]}
      titleStyle={{color: keySelected == item.id ? 'white' : 'green'}}
      type="outline"
      title={item.title}
      onPress={() => {
        setShowLoading(true);
        setKey_Selected(item.id);
      }}></Button>
  );

  const checkData = (key) => {
    if (key == 'SẢN PHẨM') {
      return testData;
    } else if (key == 'DỊCH VỤ') {
      return testDataService;
    }
  };

  const checkData_Type = (key) => {
    if (key == 'SẢN PHẨM') {
      return DATA_TYPE;
    } else if (key == 'DỊCH VỤ') {
      return DATA2_TYPE;
    }
  };

  const checkData_TypeSearch = (key) => {
    if (key == 'SẢN PHẨM') {
      return 'sản phẩm';
    } else if (key == 'DỊCH VỤ') {
      return 'dịch vụ';
    }
  };

  const {view_list, view_list_empty} = styles;

  return (
    <View style={styles.parent}>
      <HeaderCustom
        navigationHeader={navigationComponents}
        title={dataRoute}
        visibleSearch={true}
        searchPlaceHolder={'Tìm tên ' + checkData_TypeSearch(dataRoute)}
        value={search}
        onChangeText={setSearch}
        searchCode={() => {
          setShowLoading(true);
          setKey_Search(search);
        }}
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
      <View style={view_list}>
        {testData.length == 0 || testDataService.length == 0 ? (
          <View style={view_list_empty}>
            <View style={{width: '20%', height: '20%'}}>
              <Image
                source={require('../Images/icons8-empty-box-96.png')}
                style={{height: '100%', width: '100%'}}
              />
            </View>
            {dataRoute == 'SẢN PHẨM' ? (
              <ScalableText>Không có sản phẩm</ScalableText>
            ) : (
              <ScalableText>Không có dịch vụ</ScalableText>
            )}
          </View>
        ) : showLoading ? (
          <View style={view_list_empty}>
            <Image
              style={{
                width: 50, //30
                height: 50, //30
              }}
              source={require('../Images/loading/Spin-1s-200px.gif')}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={checkData(dataRoute)}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyExtractor={(item) => item.id}
          />
        )}
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
    flex: 1,
    height: Response_Size('hg', 0, 41),
    marginBottom: '3%',
    borderRadius: 5,
    marginHorizontal: '1%',
    borderColor: '#C9CFD3',
    borderWidth: 1.5,
    elevation: 3,
    backgroundColor: 'white',
  },
  item_view_img: {
    height: '50%',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  item_img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  item_view_title: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  item_view_titleSub: {
    height: '30%',
    padding: 5,
  },
  item_title: {
    color: '#309045',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item_titleSub: {
    // fontSize: 17,
    color: '#6d6b6b',
    textAlign: 'justify',
  },
  btn: {
    backgroundColor: 'white',
    borderColor: '#309045',
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  view_list: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 2,
    flex: 1,
    backgroundColor: 'white',
  },
  view_list_empty: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 2,
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product_Screen;
