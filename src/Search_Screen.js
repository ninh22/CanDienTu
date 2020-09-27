/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Card, Button} from 'react-native-elements';

const SearchScreen = () => {
  const [IsFocused, setIsFocused] = useState(true);

  const handleFocus = () => {
    setIsFocused(false);
  };
  const handleBlur = () => {
    setIsFocused(true);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.parent}>
          <Image source={require('./Images/logo3.png')} style={styles.img} />
          <Card
            containerStyle={{
              borderRadius: 15,
              width: '100%',
            }}>
            <Card.Title style={{fontSize: 25}}>Tra cứu</Card.Title>
            <Card.Divider />
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Nhập biển số xe"
              style={[
                styles.input,
                {borderColor: IsFocused ? '#E1E8EE' : 'green'},
              ]}
            />
            <TextInput
              placeholder="Nhập biển số xe"
              style={[
                styles.input,
                {borderColor: IsFocused ? 'red' : '#E1E8EE'},
              ]}
            />
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW NOW"
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
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 'auto',
    borderWidth: 1,
    borderRadius: 15,
    // borderColor: '#E1E8EE',
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  img: {
    width: 250,
    height: 200,
  },
});

export default SearchScreen;
