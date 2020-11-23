import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ScalableText from 'react-native-text';
import TextS from '../../Components/TextS';
import HeaderCustom from '../../Components/Header_Custom';
import Loading_Screen from '../../ScriptFile/Loading_Screen';
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

const Components = ({
  navigationComponents,
  dataRoute,
  onBackRefresh,
  checkScreen,
}) => {
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
  const returnData = (dataUser, dataAdmin) => {
    return checkScreen ? dataUser : dataAdmin;
  };
  const listItem = [
    {
      title: 'Họ và tên',
      content: returnData(dataRoute.name, 'Van A Admin'),
    },
    {
      title: 'Ngày sinh',
      content: '1990-10-20',
    },
    {
      title: 'Giới tính',
      content: 'Nam',
    },
    {
      title: 'Số điện thoại',
      content: returnData(dataRoute.number, '092584687'),
    },
    {
      title: 'Địa chỉ',
      content: 'Tp. Buôn Ma Thuật',
    },
    {
      title: 'Email',
      content: 'VanA@gmail.com',
    },
  ];
  const onPress = (props) => {
    return checkScreen
      ? () =>
          navigationComponents.navigate('edituserscreen', {
            data: {title: props.title, content: props.content},
          })
      : null;
  };
  const List = ({lists}) => {
    return (
      <View>
        {lists.map((l, i) => (
          <ListItem
            key={i}
            onPress={onPress(l)}
            bottomDivider
            title={l.title}
            titleStyle={{fontWeight: 'bold'}}
            rightElement={
              <ScalableText style={{width: '50%', textAlign: 'right'}}>
                {l.content}
              </ScalableText>
            }>
            {checkScreen ? (
              <ListItem.Chevron color="#309045" size={25} />
            ) : null}
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
            checkScreen ? (
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
              showAccessory={checkScreen}
              onAccessoryPress={() => _PickImage()}
              source={{
                uri: returnData(
                  userImg,
                  'https://cdn.now.howstuffworks.com/media-content/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg',
                ),
              }}
            />
            <TextS
              text={returnData(dataRoute.acc, 'Admin')}
              style={{
                color: '#fff',
                fontSize: 15,
                marginTop: '3%', //10
              }}
            />
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
  const [visible, setVisible] = useState(true);
  const [item, setItem] = useState('');
  const check_Sreen = () => {
    if (route.params === undefined) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (check_Sreen() === true) {
        setItem(route.params.item);
      }
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={
        <Components
          navigationComponents={navigation}
          dataRoute={item}
          checkScreen={check_Sreen()}
        />
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
  view_avatar: {
    padding: '5%', //20
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailUser_Screen;
