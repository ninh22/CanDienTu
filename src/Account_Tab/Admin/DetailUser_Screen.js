/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {StyleSheet, ScrollView, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import HeaderCustom from '../../Components/Header_Custom';
import Loading_Screen from '../../Components/Loading_Screen';
import BottomSheetCustom from '../../Components/BottomSheet_Custom';
import {SCLAlert, SCLAlertButton} from 'react-native-scl-alert';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Chọn hình',
  takePhotoButtonTitle: 'Chụp hình',
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
  cancelButtonTitle: 'Thoát',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Components = ({navigationComponents, dataRoute, onBackRefresh}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [imageData, setImageData] = useState('');
  const [imageName, setImageName] = useState('');
  const [userImg, setUserImg] = useState(dataRoute.img);

  const _PickImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        // console.log(source);

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setUserImg(source.uri);
        setImageData(response.data);
        setImageName(response.fileName);
      }
    });
  };

  const listBottomSheet = [
    {
      title: 'Xoá khách hàng',
      icon: 'person-remove',
      onPress: () => {
        setShowDelete(true);
        setIsVisible(false);
      },
    },
  ];
  // const returnData = (dataUser, dataAdmin) => {
  //   return checkScreen ? dataUser : dataAdmin;
  // };
  const image_Null = (uri) => {
    if (uri == '' || uri == undefined || uri == null) {
      return require('../../Images/icons8_person_96.png');
    } else {
      return {
        uri: uri,
      };
    }
  };
  const listItem = [
    {
      title: 'Họ và tên',
      content: dataRoute.name,
      // content: returnData(dataRoute.name, 'Van A Admin'),
    },
    // {
    //   title: 'Ngày sinh',
    //   content: '1990-10-20',
    // },
    // {
    //   title: 'Giới tính',
    //   content: 'Nam',
    // },
    {
      title: 'Số điện thoại',
      content: dataRoute.phonenumber,
      // content: returnData(dataRoute.number, '092584687'),
    },
    {
      title: 'Địa chỉ',
      content: dataRoute.address,
    },
    {
      title: 'Websites',
      content: dataRoute.websites,
    },
    // {
    //   title: 'Email',
    //   content: 'VanA@gmail.com',
    // },
  ];
  const onPress = (props) => {
    return () =>
      navigationComponents.navigate('edituserscreen', {
        data: {title: props.title, content: props.content},
      });
  };
  const List = ({lists}) => {
    return (
      <View>
        {lists.map((l, i) => (
          <ListItem
            key={i}
            // onPress={onPress(l)}
            bottomDivider
            title={l.title}
            titleStyle={{fontWeight: 'bold'}}
            rightElement={
              <ScalableText style={{width: '50%', textAlign: 'right'}}>
                {l.content}
              </ScalableText>
            }>
            {false ? <ListItem.Chevron color="#309045" size={25} /> : null}
          </ListItem>
        ))}
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={styles.parent}>
        <HeaderCustom
          title="Thông tin tài khoản"
          navigationHeader={navigationComponents}
          rightComponent={
            false ? (
              <Icon
                name="ellipsis-vertical"
                size={30}
                color="#fff"
                onPress={() => setIsVisible(true)}
              />
            ) : null
          }
          // onBackRefresh={onBackRefresh.state.params.test(true)}
        />
        <View style={{width: '100%', height: '100%'}}>
          <View backgroundColor="#309045" style={styles.view_avatar}>
            <Avatar
              rounded
              size="xlarge"
              showAccessory={false}
              onAccessoryPress={() => _PickImage()}
              // source={image_Null(userImg)}
              source={require('../../Images/icons8_person_96.png')}
            />
            {/* <TextS
              text={returnData(dataRoute.acc, 'Admin')}
              style={{
                color: '#fff',
                fontSize: 15,
                marginTop: '3%', //10
              }}
            /> */}
          </View>
          <List lists={listItem} />
        </View>
      </View>
      <BottomSheetCustom
        visible={isVisible}
        setVisible={setIsVisible}
        title="Tuỳ chọn"
        listItem={listBottomSheet}
      />
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
  );
};

const DetailUser_Screen = ({navigation, route}) => {
  const [visible, setVisible] = useState(false);
  let index = route.params.index;
  let item = useSelector((state) => state.userReducer[index]);

  useEffect(() => {
    // setTimeout(() => {
    //   if (check_Sreen() === true) {
    //     setItem(route.params.item);
    //   }
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
    alignItems: 'center',
  },
  view_avatar: {
    padding: '5%', //20
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailUser_Screen;
