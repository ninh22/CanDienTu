/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import DateTime from '../Components/DateTime';
import HeaderCustom from '../Components/Header_Custom';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card, Button, ListItem} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import DataNull from '../Components/DataNull';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import ScalableText from 'react-native-text';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';

const IconCustom = (icons) => {
  return (
    <TouchableOpacity
      style={[
        {
          position: 'absolute',
          top: 0,
          margin: 10,
        },
        icons.location, // Custom location icon
      ]}
      onPress={icons.onPress}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.26)',
          borderRadius: 50,
          padding: 1,
        }}>
        {icons.icon ? ( // Custom type icon
          <Icon name={icons.nameIcon} size={30} color="#fff" />
        ) : (
          <MaterialCommunityIcons
            name={icons.nameIcon}
            size={30}
            color="#fff"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

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
  const [isModal, setIsModal] = useState(false);
  const [num, setnum] = useState(0);
  // let listData = [
  //   {
  //     img: dataRoute.img,
  //   },
  //   {
  //     img: dataRoute.img,
  //   },
  //   {
  //     img: dataRoute.img,
  //   },
  //   {
  //     img: dataRoute.img,
  //   },
  // ];
  // const imageUrls = listData.map((item, index) => {
  //   return {
  //     url: item.img,
  //     width: Dimensions.get('window').width,
  //     height: Response_Size('hg', 0, 40), //300
  //   };
  // });
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
      content: dataRoute.net_weight,
      weight: true,
    },
    {
      title: 'Trọng lượng xe',
      content: dataRoute.weight_1,
      weight: true,
    },
    {
      title: 'Trọng lượng hàng hoá',
      content: dataRoute.weight_2,
      weight: true,
    },
    {
      title: 'Tiền cân',
      content: dataRoute.price_total,
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
            // source={require('../Images/logo_white.png')}
            source={require('../Images/Logo/500px/bootsplash_logo.png')}
          />
          {/* <ImageViewer
            imageUrls={imageUrls}
            enableImageZoom={false}
            index={num}
            onChange={(index) => setnum(index)}
            saveToLocalByLongPress={false}
            // menuContext={{
            //   saveToLocal: 'Lưu vào máy',
            //   cancel: 'Huỷ',
            // }}
            renderIndicator={(currentIndex, allSize) => {
              // currentIndex + '/' + allSize;
              return (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    margin: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
                    padding: 5,
                    borderRadius: 10,
                  }}>
                  <ScalableText style={{color: 'rgba(0,0,0,0.7)'}}>
                    {currentIndex}/{allSize}
                  </ScalableText>
                </View>
              );
            }}
          /> */}
          {/* <Modal visible={isModal} transparent={true}>
            <IconCustom
              icon={false} // Custom type icon
              nameIcon={'arrow-collapse'}
              location={{right: 0, zIndex: 1}} // false is right
              onPress={() => setIsModal(false)}
            />
            <ImageViewer
              imageUrls={imageUrls}
              enableImageZoom={true}
              onCancel={() => {
                setIsModal(false);
              }}
              index={num}
              onChange={(index) => setnum(index)}
            />
          </Modal> */}
          {/* <IconCustom
            icon={true} // Custom type icon
            nameIcon="chevron-back-outline"
            location={{left: 0}} // true is left
            onPress={() => navigationComponents.goBack()}
          /> */}
          {/* <IconCustom
            icon={false} // Custom type icon
            nameIcon={'arrow-expand'}
            location={{right: 0}} // false is right
            onPress={() => setIsModal(true)}
          /> */}
        </View>
        <List lists={listItem} />
        {/* <View style={{padding: '1.5%'}}>
          <ScalableText style={{fontSize: 20}}>
            Xe số: {dataRoute.truct_no} {'\n'}
            Khách hàng: {dataRoute.customer_name} {'\n'}
            Hàng hoá: {dataRoute.items_name} {'\n'}
            Trọng lượng toàn bộ: {dataRoute.weight_2} ({dataRoute.price_total2}{' '}
            Đồng) {'\n'}
            Trọng lượng xe: {dataRoute.weight_1} ({dataRoute.price_total1} Đồng){' '}
            {'\n'}
            Trọng lượng hàng hoá: {dataRoute.net_weight} ({dataRoute.price_w}{' '}
            Đồng) {'\n'}
            Ngày giờ cân: {dataRoute.date_in}
          </ScalableText>
        </View> */}
      </View>
    </ScrollView>
  );
};

const ResultDetail_Screen = ({navigation, route}) => {
  const [item, setItem] = useState(route.params.item);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // setTimeout(() => {
    //   setVisible(false);
    // }, 500);
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
  iconLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
  iconRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
});

export default ResultDetail_Screen;
