/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card, Button, Badge} from 'react-native-elements';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';

const Item = ({onPress, title, nameIcon, typeIcon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {typeIcon ? (
        <FontAwesome5Icon name={nameIcon} size={40} color="#309045" />
      ) : (
        <Icon name={nameIcon} size={40} color="#309045" />
      )}
      <ScalableText style={styles.item_txt} numberOfLines={2}>
        {title}
      </ScalableText>
    </TouchableOpacity>
  );
};

const ItemView = ({title, number, navigationComponents, key}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigationComponents.navigate('resultscreen', {
          key: key,
        })
      }
      style={[styles.item, {width: '98%'}]}>
      <ScalableText
        style={[styles.item_txt, {fontSize: 30, color: '#309045'}]}
        numberOfLines={1}>
        {number}
      </ScalableText>
      <ScalableText style={styles.item_txt} numberOfLines={1}>
        Phiếu / {title}
      </ScalableText>
    </TouchableOpacity>
  );
};

const Noti = (props) => {
  return (
    <TouchableOpacity
      style={styles.style_touchOpacity_notiIcon}
      onPress={() => {
        alert('123');
      }}>
      <View style={styles.view_icon_noti}>
        <Icon name="notifications" size={35} color="#fff" />
        <Badge
          value={props.value}
          status="error"
          containerStyle={{position: 'absolute', top: -3, right: -3}}
        />
      </View>
    </TouchableOpacity>
  );
};

const Components = ({navigationComponents}) => {
  return (
    <ScrollView>
      <View style={styles.parent}>
        <View style={styles.view_img} backgroundColor="#309045">
          <Image
            source={require('../../Images/logo_white.png')}
            style={styles.img}
          />
          {/* <Noti value="99+" /> */}
        </View>
        <View
          style={{
            marginTop: '3%',
            width: '100%',
            height: '100%', //300
          }}>
          <View style={styles.card_title}>
            <ScalableText style={styles.text_card}>THỐNG KÊ PHIẾU</ScalableText>
          </View>
          <View style={styles.parent_item}>
            <View
              style={[
                styles.view_item,
                {
                  marginBottom: '2%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                },
              ]}>
              <ItemView
                title="Ngày"
                number={5}
                navigationComponents={navigationComponents}
                key={'Ngày'}
              />
              <ItemView
                title="Tháng"
                number={100}
                navigationComponents={navigationComponents}
                key={'Tháng'}
              />
              <ItemView
                title="Năm"
                number={1500}
                navigationComponents={navigationComponents}
                key={'Năm'}
              />
            </View>
            <View style={styles.view_item}>
              <Item
                title="Tài khoản"
                typeIcon={true}
                nameIcon="user-alt"
                onPress={() => navigationComponents.navigate('userinfoscreen')}
              />
              <Item
                title="Đăng xuất"
                typeIcon={false}
                nameIcon="log-out"
                onPress={() => alert(123)}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const HomeUser_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={true}
      visible={visible}
      code={<Components navigationComponents={navigation} />}
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  view_img: {
    width: '100%',
    height: Response_Size('hg', 0, 37), //250 //37
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  img: {
    width: Response_Size('wd', 0, 90), //350
    height: Response_Size('hg', 1, 37, 40), //100
  },
  parent_item: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '3%',
  },
  view_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  style_touchOpacity_notiIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 10,
  },
  view_icon_noti: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    width: '47%',
    height: Response_Size('hg', 1, 43, 43), //130
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    padding: '3%',
    borderRadius: 10,
    marginBottom: '3%',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 5,
    borderColor: '#C9CFD3',
    borderWidth: 1,
  },
  item_txt: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: '3%', //5
  },
  view_card: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderColor: '#C9CFD3',
    marginBottom: '3%',
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_title: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: '1%',
    paddingHorizontal: '5%',
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // backgroundColor: '#309045',
  },
  text_card: {fontSize: 20, color: '#309045', fontWeight: 'bold'},
});

export default HomeUser_Screen;
