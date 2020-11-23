import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
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
      // rightComponent={rightComponent}
      rightComponent={
        false || visibleSearch ? (
          <View style={styles.view_input}>
            <Icon name="search" size={25} color="#989898" />
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={searchPlaceHolder}
              // placeholderTextColor="#309045"
              style={{
                width: width(IsFocused),
                // width: '90%',
                borderWidth: 0,
                padding: 0,
              }}
              underlineColorAndroid="transparent"
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
            {IsFocused ? null : (
              <TouchableOpacity onPress={() => onChangeText('')}>
                <Icon name="close-circle" size={25} color="#989898" />
              </TouchableOpacity>
            )}
            {/* {IsFocused ? null : (
              <Image
                style={{
                  width: Response_Size('wd', 1, 85, 10), //30
                  height: Response_Size('hg', 1, 6, 80), //30
                  // tintColor: '#309045',
                }}
                source={require('../Images/loading/Spin-1s-200px.gif')}
              />
            )} */}
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
    height: Response_Size('hg', 0, 6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '2%',
    borderRadius: 10,
  },
});

export default HeaderCustom;
