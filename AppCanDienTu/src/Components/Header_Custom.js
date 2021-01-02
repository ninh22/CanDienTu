/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import ScalableText from 'react-native-text';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';

const HeaderCustom = ({
  navigationHeader,
  title,
  rightComponent,
  visibleSearch,
  searchPlaceHolder,
  searchCode,
  value,
  onChangeText,
  onBackRefresh,
}) => {
  const [IsFocused, setIsFocused] = useState(true);
  const handleFocus = () => {
    setIsFocused(false);
  };
  const handleBlur = () => {
    setIsFocused(true);
  };
  const width = (IsFocused) => {
    return IsFocused ? '90%' : '80%'; //80%
  };
  return (
    <Header
      leftComponent={
        <TouchableOpacity
          style={{borderRadius: 50}}
          onPress={() => {
            navigationHeader.goBack();
            onBackRefresh;
          }}>
          <Icon name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
      }
      centerComponent={
        false || visibleSearch ? null : (
          <ScalableText style={{fontSize: 17, color: '#fff'}}>
            {title}
          </ScalableText>
        )
      }
      rightComponent={
        false || visibleSearch ? (
          <View style={styles.view_input}>
            <Icon name="search" size={25} color="#989898" />
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={searchPlaceHolder}
              style={{
                width: width(IsFocused),
                borderWidth: 0,
                padding: 0,
              }}
              onEndEditing={searchCode}
              underlineColorAndroid="transparent"
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
            {IsFocused ? null : (
              <TouchableOpacity onPress={() => onChangeText('')}>
                <Icon name="close-circle" size={25} color="#989898" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          rightComponent
        )
      }
      backgroundColor="#309045"
      containerStyle={{elevation: 7}}
    />
  );
};

const styles = StyleSheet.create({
  view_input: {
    backgroundColor: 'white',
    width: Response_Size('wd', 0, 85),
    height: Response_Size('hg', 0, 5.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '2%',
    borderRadius: 10,
  },
});

export default HeaderCustom;
