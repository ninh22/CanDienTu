/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { getUserGroupAction } from '../../../Redux/index';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ScalableText from 'react-native-text';
import _removeData from '../../../ScriptFile/Logout';
import { ProgressCircle } from 'react-native-svg-charts';
import ViewCongViecHomNay from '../QuanLyCongViec/CongViecHomNay';
import AnimatedHeader from './components/AnimatedHeader';
import { SafeAreaView } from 'react-native';
const size = Dimensions.get("window");
const size_view = Dimensions.get("screen");
const Item = ({ onPress, title, nameIcon, typeIcon }) => {
  const { } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      {typeIcon ? (
        <FontAwesome5Icon name={nameIcon} size={20} color="#309045" />
      ) : (
          <Icon name={nameIcon} size={30} color="#309045" />
        )}
      <ScalableText style={styles.item_txt} numberOfLines={2}>
        {title}
      </ScalableText>
    </TouchableOpacity>
  );
};

const HomeAdmin_Screen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const nullItem = (item) => dispatch(getUserGroupAction(item));
  const [id, setId] = useState(null);
  const offset = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    _retrieveData();

  });
  const _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('@Key');
      value = await JSON.parse(value);
      if (value !== null) {
        setId(value.id);
      } else {
        setId(route.params.id);
      }
    } catch (error) { }
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#309045"/>
      <AnimatedHeader animatedValue={offset} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
        scrollEventThrottle={16}
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: (size.height * 0.25) + 20,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.parent}>
          <View
            style={{
              width: '100%',
              justifyContent: "center",
              alignItems: "center",
              padding: size.width * 0.01,

            }}>

            <View style={styles.parent_item}>
              <View
                style={[
                  styles.view_item
                ]}>
                <Item
                  title="Quản lý khách hàng"
                  typeIcon={true}
                  nameIcon="users"
                  onPress={() => {
                    nullItem(null);
                    navigation.navigate('listusergroupscreen');
                  }}
                />
                <Item
                  title="Quản lý nhân viên"
                  typeIcon={true}
                  nameIcon="address-card"
                  onPress={() => navigation.navigate('screenlistnhanvien')}
                />
                <Item
                  title="Công việc"
                  typeIcon={false}
                  nameIcon="ios-git-branch"
                  onPress={() => navigation.navigate('addscreen')}
                />
                <Item
                  title="Sản phẩm"
                  typeIcon={true}
                  nameIcon="barcode"
                  onPress={() => navigation.navigate('screenListSanPham')}
                />

              </View>
              <View style={styles.view_item}>
                <Item
                  title="Đơn hàng"
                  typeIcon={true}
                  nameIcon="box-open"
                  onPress={() => navigation.navigate('addscreen')}
                />
                <Item
                  title="Hoá đơn"
                  typeIcon={true}
                  nameIcon="file-invoice-dollar"
                  onPress={() => navigation.navigate('addscreen')}
                />
                <Item
                  title="Thêm khách hàng"
                  typeIcon={true}
                  nameIcon="user-plus"
                  onPress={() => navigation.navigate('addscreen')}
                />
                <Item
                  title="Dịch vụ"
                  typeIcon={false}
                  nameIcon="ios-construct-sharp"
                  onPress={() => _removeData(navigation)}
                />
              </View>
              <View style={styles.view_item}>
                <Item
                  title="Đổi mật khẩu"
                  typeIcon={false}
                  nameIcon="key"
                  onPress={() =>
                    navigation.navigate('userchangepasswordscreen', {
                      changePassword: {
                        permission: 'user',
                        id: id,
                      },
                    })
                  }
                />
                <Item
                  title="Đăng xuất"
                  typeIcon={false}
                  nameIcon="log-out"
                  onPress={() => _removeData(navigation)}
                />
              </View>
            </View>
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#f4f4f8", marginBottom: 20, marginHorizontal: size.width * 0.1 }}></View>
          <View style={{ flexDirection: "row", flex: 1, marginBottom: 20, }}>
            <View style={styles.view_title}>
              <Image
                source={require('../../../Images/Icons/icons_linechart.png')}
                resizeMode="cover"
                style={{ height: 25, width: 25 }}
              />
              <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 10, color: "#343d46" }}>Tiến trình công việc</Text>
            </View>
          </View>
          <View style={{ width: "100%", padding: 10, marginBottom: 20 }}>
            <ProgressCircle
              style={{ height: 200 }}
              progress={0.5}
              strokeWidth={15}
              progressColor={"#64a1f4"}
              children={
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
                    <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#64a1f4", marginRight: 3 }}></View>
                    <Text>Hoàn thành {"50%"}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: "#DCDCDC", marginRight: 3 }}></View>
                    <Text>Còn {"50%"}</Text>
                  </View>
                </View>
              }
            />
          </View>
          <View style={{ borderTopWidth: 1, borderColor: "#f4f4f8", marginBottom: 20, marginHorizontal: size.width * 0.1 }}></View>
          <View style={{ flexDirection: "row", flex: 1, marginBottom: 20,paddingHorizontal:5 }}>
            <View style={styles.view_title}>
              <Image
                source={require('../../../Images/Icons/icons_git.png')}
                resizeMode="cover"
                style={{ height: 25, width: 25 }}
              />
              <Text style={{ fontSize: 17, fontWeight: "bold", marginLeft: 10, color: "#343d46" }}>Công việc mới</Text>
            </View>
            <View style={{ flex: 1,flexDirection:"row",justifyContent:"flex-end" }}>
              <View style={[styles.view_title,{paddingHorizontal:10}]}>
                <Text>Xem thêm {">>"}</Text>
              </View>
            </View>
          </View>
          <ViewCongViecHomNay />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    flex: 1,
  },
  view_header: {
    height: size.height * 0.06,
    backgroundColor: "#3CB371",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
  view_img: {
    width: '100%',
    height: size.height * 0.2, //250
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flexDirection: "row",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  img: {
    width: size.width * 0.39,
    height: size.height * 0.1,
  },
  parent_item: {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  view_item: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "flex-start"
  },
  item: {
    width: size.width * 0.22,
    height: size.width * 0.22, //130
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    borderColor: 'white',

  },
  item_txt: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    padding: 5
  },
  view_title: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    backgroundColor: "rgba(168,230,207,0.5)",
    marginHorizontal: 5,
    padding: 5,
    borderRadius: 5,
  }

});

export default HomeAdmin_Screen;
