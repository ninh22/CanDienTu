/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {getUserGroupAction} from '../../Redux/index';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Response_Size from '../../ScriptFile/ResponsiveSize_Script';
import ScalableText from 'react-native-text';
import _removeData from '../../Components/Logout';

const Item = ({onPress, title, nameIcon, typeIcon}) => {
  const {} = styles;
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

const HomeAdmin_Screen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const nullItem = (item) => dispatch(getUserGroupAction(item));
  const [id, setId] = useState(null);
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
    } catch (error) {}
  };

  return (
    <ScrollView>
      <View style={styles.parent}>
        <View style={styles.view_img} backgroundColor="#309045">
          <Image
            source={require('../../Images/logo_white.png')}
            resizeMode="stretch"
            style={styles.img}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: Response_Size('hg', 0, 43), //300
          }}>
          <View style={styles.parent_item}>
            <View
              style={[
                styles.view_item,
                {
                  marginBottom: '2%',
                },
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
                title="Thêm khách hàng"
                typeIcon={true}
                nameIcon="user-plus"
                onPress={() => navigation.navigate('addscreen')}
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
  },
  view_img: {
    width: '100%',
    height: Response_Size('hg', 0, 37), //250
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
    position: 'absolute',
    paddingHorizontal: '3%',
    top: -50,
  },
  view_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textAlign: 'center',
  },
});

export default HomeAdmin_Screen;
