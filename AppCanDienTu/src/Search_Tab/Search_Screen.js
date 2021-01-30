/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Button} from 'react-native-elements';
import Input from '../Components/Input';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import CardView from '../Components/CardView_Custom';
import {RNToasty} from 'react-native-toasty';
import Regex from '../ScriptFile/Regex';

const Search_Screen = ({navigation}) => {
  const [text, setText] = useState('');
  const [check, setCheck] = useState(true);
  const [isButton, setIsButton] = useState(true);
  const checkText = (content) => {
    if (Regex(content, 'licensePlates') == false) {
      RNToasty.Error({
        title: 'Nội dung không chứa các ký tự đặc biệt',
        duration: 1,
      });
      setCheck(false);
      setIsButton(true);
    } else {
      setCheck(true);
      setIsButton(false);
    }
  };
  const Content = () => {
    return (
      <View>
        <Input
          heightParent={40}
          heightI={18}
          placeHolder="Nhập biển số xe"
          nameIcon="car"
          value={text}
          check={check}
          codeCheck={checkText}
          onChangeText={setText}
        />
        <Button
          buttonStyle={styles.btn}
          title="Tra cứu"
          disabled={isButton}
          onPress={() => {
            // checkText(text);
            navigation.navigate('resultscreen', {
              value: text,
            });
          }}
        />
      </View>
    );
  };
  return <CardView title="Tra cứu phiếu cân xe" content={Content()} />;
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: Response_Size('hg', 1, 40, 18.5),
    backgroundColor: '#309045',
    borderRadius: 10,
  },
});

export default Search_Screen;
