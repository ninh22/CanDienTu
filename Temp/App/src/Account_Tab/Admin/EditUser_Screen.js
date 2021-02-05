/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import ScalableText from 'react-native-text';
import Input from '../../Components/Input';
import HeaderCustom from '../../Components/Header_Custom';
import Loading_Screen from '../../Components/Loading_Screen';
import {RNToasty} from 'react-native-toasty';

const Components = ({navigationComponents, dataRoute, onBackRefresh}) => {
  const [content, setContent] = useState(dataRoute.content);
  const [contentDefault, setContentDefault] = useState(dataRoute.content);
  const [checkContent, setcheckContent] = useState(true);
  const [save, setSave] = useState(true);
  const listItemDropDown = [
    {
      dropDown_Item: 'Nam',
    },
    {
      dropDown_Item: 'Nữ',
    },
  ];
  const check_Content = (content) => {
    if (content == '') {
      RNToasty.Error({
        title: 'Nội dung không được để trống',
      });
      setcheckContent(false);
      // setStatusPass(false);
    } else {
      setcheckContent(true);
      // setStatusPass(true);
    }
  };
  const check_Save = (content) => {
    if (content == contentDefault) {
      setSave(true);
      // setStatusPass(false);
    } else if (content == '') {
      setSave(true);
      // setStatusPass(false);
    } else {
      setSave(false);
      // setStatusPass(true);
    }
  };
  useEffect(() => {
    check_Save(content);
  });
  const check = () => {
    if (dataRoute.title == 'Ngày sinh') {
      return 0;
    } else if (dataRoute.title == 'Giới tính') {
      return 2;
    } else if (dataRoute.title == 'Số điện thoại') {
      return 'phone-pad';
    } else if (dataRoute.title == 'Email') {
      return 'email-address';
    }
  };
  return (
    <View style={styles.parent}>
      <HeaderCustom
        title={dataRoute.title}
        navigationHeader={navigationComponents}
        rightComponent={
          <TouchableOpacity
            disabled={save}
            onPress={() => {
              alert(123);
            }}>
            <ScalableText
              style={{color: save ? '#989898' : '#fff', fontSize: 17}}>
              Lưu
            </ScalableText>
          </TouchableOpacity>
        }
        // onBackRefresh={onBackRefresh.state.params.test(true)}
      />
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: '3%',
        }}>
        <Input
          heightParent={40}
          heightI={18}
          placeHolder="Nhập nội dung"
          value={content}
          check={checkContent}
          codeCheck={check_Content}
          onChangeText={setContent}
          noIcon={true}
          type={check()}
          date={content}
          setDate={setContent}
          dropDown_TextSelected={content}
          setDropDown_TextSelected={setContent}
          dropDown_List={listItemDropDown}
          keyboardType={check()}
        />
      </View>
    </View>
  );
};

const EditUser_Screen = ({navigation, route}) => {
  const [data, setData] = useState(route.params.data);
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
      code={<Components navigationComponents={navigation} dataRoute={data} />}
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});

export default EditUser_Screen;
