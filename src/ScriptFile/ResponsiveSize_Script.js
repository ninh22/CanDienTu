/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions} from 'react-native';

const Response_Size = (type, value, ratio, ratioChild) => {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  let temp = 0;
  if (type == 'wd') {
    switch (value) {
      case 0:
        temp = SCREEN_WIDTH * (ratio / 100);
        break;
      case 1:
        temp = SCREEN_WIDTH * (ratio / 100);
        temp = temp * (ratioChild / 100);
        break;
    }
    return temp;
  } else if (type == 'hg') {
    switch (value) {
      case 0:
        temp = SCREEN_HEIGHT * (ratio / 100);
        break;
      case 1:
        temp = SCREEN_HEIGHT * (ratio / 100);
        temp = temp * (ratioChild / 100);
        break;
    }
    return temp;
  }
};

export default Response_Size;
