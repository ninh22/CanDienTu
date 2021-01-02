/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import DatePicker from 'react-native-datepicker';
import ScalableText from 'react-native-text';

const Input = ({
  placeHolder,
  nameIcon,
  value,
  onChangeText,
  check,
  keyCheck,
  codeCheck,
  heightI,
  heightParent,
  secure,
  noIcon,
  type,
  date,
  setDate,
  dropDown_TextSelected,
  setDropDown_TextSelected,
  setDropDown_Value,
  dropDown_CustomOnPress,
  dropDown_List,
  keyboardType,
}) => {
  const [IsFocused, setIsFocused] = useState(true);
  const [IsDelete, setIsDelete] = useState(false);
  const [IsDate, setIsDate] = useState(true);
  const [IsDropDown, setIsDropDown] = useState(false);
  const [IsDropDownBorder, setIsDropDownBorder] = useState(false);
  const [IsDropDownIcon, setIsDropDownIcon] = useState(false);

  const handleFocus = () => {
    setIsFocused(false);
    setIsDelete(true);
  };
  const handleBlur = () => {
    setIsFocused(true);
    setIsDelete(false);
    codeCheck(value, keyCheck);
  };
  const color = (checkColor) => {
    return checkColor ? '#C9CFD3' : 'red';
  };
  const Delete = ({visible}) => {
    return visible ? (
      <TouchableOpacity onPress={() => onChangeText('')}>
        <Icon name="close-circle" size={25} color="#989898" />
      </TouchableOpacity>
    ) : null;
  };
  const width = () => {
    return noIcon ? (IsDelete ? '93%' : '100%') : '90%';
  };
  switch (type) {
    case 0:
      return (
        <DatePicker
          style={{
            width: '100%',
            marginTop: '1.5%',
            marginBottom: '3%',
          }}
          date={date}
          mode="date"
          showIcon={false}
          placeholder="Chọn ngày hết hạn"
          format="YYYY-MM-DD"
          confirmBtnText="Xác nhận"
          cancelBtnText="Thoát"
          onOpenModal={() => {
            setIsDate(false);
          }}
          onCloseModal={() => {
            setIsDate(true);
            codeCheck(date, keyCheck);
          }}
          customStyles={{
            dateInput: [
              styles.input,
              {
                height: Response_Size('hg', 1, heightParent, heightI),
                marginBottom: 0,
                alignItems: 'center',
                justifyContent: 'flex-start',
              },
              {borderColor: IsDate ? color(check) : 'green'},
            ],
            placeholderText: {
              color: '#A1A1A1',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(date) => {
            setDate(date);
            setIsDate(true);
            codeCheck(date, keyCheck);
          }}
        />
      );
    case 1:
      return (
        <View
          style={[
            styles.input,
            {borderColor: IsFocused ? color(check) : 'green'},
            {
              height: Response_Size('hg', 1, heightParent, heightI), // 40 18
              alignItems: 'center',
              justifyContent: 'space-around',
              marginBottom: '1%',
            },
          ]}>
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeHolder}
            keyboardType={keyboardType}
            style={{
              width: '100%',
              borderWidth: 0,
              padding: 0,
            }}
            underlineColorAndroid="transparent"
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
      );
    case 2:
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              setIsDropDown(!IsDropDown);
              setIsDropDownBorder(!IsDropDownBorder);
              setIsDropDownIcon(!IsDropDownIcon);
            }}
            style={[
              styles.input,
              {
                borderColor: '#C9CFD3',
                height: Response_Size('hg', 1, heightParent, heightI), // 40 18
                borderBottomLeftRadius: IsDropDownBorder ? 0 : 10,
                borderBottomRightRadius: IsDropDownBorder ? 0 : 10,
              },
            ]}>
            <View
              style={[styles.dropDown_ChildView, {alignItems: 'flex-start'}]}>
              <ScalableText>{dropDown_TextSelected}</ScalableText>
            </View>
            <View style={[styles.dropDown_ChildView, {alignItems: 'flex-end'}]}>
              <Icon
                name={
                  IsDropDownIcon ? 'md-caret-up-sharp' : 'md-caret-down-sharp'
                }
                size={17}
                color="#989898"
              />
            </View>
          </TouchableOpacity>
          {IsDropDown ? (
            <View style={[styles.input, styles.dropDown_ItemView]}>
              {dropDown_List.map((l, i) => (
                <View style={{width: '100%'}} key={i}>
                  <TouchableOpacity
                    style={{
                      width: Response_Size('wd', 0, 100),
                      height: Response_Size('hg', 1, heightI, 30),
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setIsDropDown(!IsDropDown);
                      setIsDropDownBorder(!IsDropDownBorder);
                      setIsDropDownIcon(!IsDropDownIcon);
                      setDropDown_TextSelected(l.dropDown_title);
                      dropDown_CustomOnPress(true);
                      setDropDown_Value(l.dropDown_value);
                    }}>
                    <ScalableText>{l.dropDown_title}</ScalableText>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      );
    default:
      return (
        <View
          style={[
            styles.input,
            {borderColor: IsFocused ? color(check) : 'green'},
            {
              height: Response_Size('hg', 1, heightParent, heightI), // 40 18
            },
          ]}>
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeHolder}
            secureTextEntry={false || secure}
            keyboardType={keyboardType}
            // autoFocus={false || noIcon}
            style={{
              width: width(),
              borderWidth: 0,
              padding: 0,
            }}
            underlineColorAndroid="transparent"
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
          {false || noIcon ? (
            <Delete visible={IsDelete} />
          ) : (
            <Icon name={nameIcon} size={25} color="#989898" />
          )}
        </View>
      );
  }
};

const styles = StyleSheet.flatten({
  input: {
    width: '100%',
    backgroundColor: 'white',
    // height: Response_Size('hg', 1, heightP(), heightI()), // 40 18
    borderWidth: 1,
    borderRadius: 10,
    // borderColor: '#C9CFD3',
    marginBottom: '3%', //16
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '2%',
  },
  dropDown_ChildView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  dropDown_ItemView: {
    borderColor: '#C9CFD3',
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 1,
    top: '80%', //50
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default Input;
