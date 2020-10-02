/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button, Input, Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const SearchHaveAcc_Screen = ({navigation}) => {
  const [IsFocused, setIsFocused] = useState(true);

  const handleFocus = () => {
    setIsFocused(false);
  };
  const handleBlur = () => {
    setIsFocused(true);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
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
        centerComponent={{
          text: 'Tra cứu phiếu',
          style: {color: '#fff', fontSize: 20},
        }}
        // rightComponent={{icon: 'home', color: '#fff'}}
        backgroundColor="#309045"
        containerStyle={{elevation: 7}}
      />
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
              Tra cứu phiếu cân xe
            </Card.Title>
            <Card.Divider />
            <Input
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Nhập biển số xe"
              containerStyle={[
                styles.input,
                {borderColor: IsFocused ? '#C9CFD3' : 'green'},
              ]}
              inputContainerStyle={{borderBottomWidth: 0}}
              rightIcon={<Icon name="car" size={25} color="#989898" />}
            />
            <Button
              buttonStyle={styles.btn}
              title="Tra cứu"
              onPress={() => {
                navigation.navigate('resultscreen');
              }}
            />
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
    marginBottom: 16,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
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

export default SearchHaveAcc_Screen;
