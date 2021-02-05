/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';

const _removeData = async (navigation) => {
  try {
    await AsyncStorage.removeItem('@Key');
    navigation.replace('loginscreen');
    // console.warn(value);
  } catch (error) {
    // Error retrieving data
    // console.error(error);
  }
};
export default _removeData;
