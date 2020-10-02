import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  Header,
  Card,
  Image,
  Avatar,
  ListItem,
  Divider,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import OptionsMenu from 'react-native-options-menu';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const List = (item) => {
  return (
    <ListItem
      bottomDivider
      title={item.title}
      titleStyle={{fontWeight: 'bold'}}
      rightElement={
        <Text style={{width: '60%', textAlign: 'right'}}>{item.content}</Text>
      }
    />
  );
};

const UserDetail_Screen = ({navigation, route}) => {
  const [item, setItem] = useState(route.params.item);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
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
            rightComponent={
              <OptionsMenu
                customButton={
                  <Icon name="ellipsis-vertical" size={30} color="#fff" />
                }
                destructiveIndex={1}
                options={['Sửa thông tin khách hàng', 'Xoá khách hàng']}
                actions={[
                  () => {
                    navigation.navigate('edituserscreen', {
                      item: item,
                    });
                  },
                  () => {
                    setShowDelete(true);
                  },
                ]}
              />
            }
            centerComponent={{
              text: 'Thông tin Khách hàng',
              style: {color: '#fff', fontSize: 20},
            }}
            // rightComponent={{icon: 'home', color: '#fff'}}
            backgroundColor="#309045"
            containerStyle={{elevation: 7}}
          />
          <View style={{width: '100%', height: '100%'}}>
            <View
              backgroundColor="#309045"
              style={{
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                rounded
                size="xlarge"
                source={{
                  uri: item.img,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#fff',
                  marginTop: 10,
                }}>
                {item.name}
              </Text>
              <Text style={{color: '#fff', fontSize: 17}} numberOfLines={1}>
                {item.acc}
              </Text>
            </View>
            <List title="Ngày sinh" content="20/10/1990" />
            <List title="Giới tính" content="Nam" />
            <List title="Số điện thoại" content={item.number} />
            <List title="Địa chỉ" content="Tp. Buôn Ma Thuật" />
          </View>
        </View>
        <SCLAlert
          theme="danger"
          show={showDelete}
          title="Xoá khách hàng"
          headerIconComponent={<Icon name="trash" size={35} color="#fff" />}
          cancellable={false}
          subtitle="Bạn chắc chứ">
          <SCLAlertButton
            theme="danger"
            onPress={() => {
              setShowDelete(false);
            }}>
            Done
          </SCLAlertButton>
          <SCLAlertButton theme="default" onPress={() => setShowDelete(false)}>
            Cancel
          </SCLAlertButton>
        </SCLAlert>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    paddingBottom: 5,
    alignItems: 'center',
  },
  parent_item: {
    width: '47%',
    height: 130,
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

export default UserDetail_Screen;
