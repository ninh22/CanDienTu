/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button, Input, CheckBox, Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Login_Screen = ({navigation}) => {
  const [IsFocused, setIsFocused] = useState(true);
  const [IsFocused2, setIsFocused2] = useState(true);

  const [save, setSave] = useState(false);
  const [hide, setHide] = useState(true);
  const [boxhide, setBoxhide] = useState(false);

  const handleFocus = () => {
    setIsFocused(false);
  };
  const handleBlur = () => {
    setIsFocused(true);
  };
  const handleFocus2 = () => {
    setIsFocused2(false);
  };
  const handleBlur2 = () => {
    setIsFocused2(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={styles.parent}>
          <Image source={require('./Images/logo1.png')} style={styles.img} />
          <Card
            containerStyle={{
              borderRadius: 15,
              width: '100%',
              borderTopWidth: 10,
              borderTopColor: '#309045',
            }}>
            <Card.Title style={{fontSize: 20, fontWeight: 'normal'}}>
              Tài khoản
            </Card.Title>
            <Card.Divider />
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Nhập tên tài khoản"
              containerStyle={[
                styles.input,
                {borderColor: IsFocused ? '#C9CFD3' : 'green'},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              rightIcon={<Icon name="person" size={25} color="#989898" />}
            />
            <Input
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              placeholder="Nhập mật khẩu"
              secureTextEntry={hide}
              containerStyle={[
                styles.input,
                {borderColor: IsFocused2 ? '#C9CFD3' : 'green'},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              rightIcon={
                <Icon name="lock-closed-sharp" size={25} color="#989898" />
              }
            />
            <View
              style={{
                justifyContent: 'center',
                marginBottom: 10,
                flexDirection: 'row',
              }}>
              <View style={{width: '50%', alignItems: 'flex-start'}}>
                <CheckBox
                  containerStyle={{
                    marginVertical: 0,
                    padding: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                  }}
                  title="Hiện mật khẩu"
                  checked={boxhide}
                  checkedColor="#309045"
                  onPress={() => {
                    setBoxhide(!boxhide);
                    setHide(!hide);
                  }}
                />
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <CheckBox
                  containerStyle={{
                    marginVertical: 0,
                    padding: 0,
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                  }}
                  title="Lưu mật khẩu"
                  checked={save}
                  checkedColor="#309045"
                  onPress={() => {
                    setSave(!save);
                  }}
                />
              </View>
            </View>
            <Button
              buttonStyle={styles.btn}
              title="Đăng nhập"
              onPress={() => {
                navigation.navigate('homeadminscreen');
              }}
            />
            <View style={{alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('tongQuanUser');
                }}>
                <Text style={styles.txt}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#C9CFD3',
    marginBottom: 10,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 1,
  },
  img: {
    width: 350,
    height: 100,
  },
  btn: {
    width: '100%',
    height: 50,
    backgroundColor: '#309045',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  txt: {
    textDecorationLine: 'underline',
    fontSize: 15,
  },
});

export default Login_Screen;
