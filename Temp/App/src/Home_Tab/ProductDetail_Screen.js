/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import CallButton from '../Components/CallButton';
import Loading_Screen from '../Components/Loading_Screen';
import ScalableText from 'react-native-text';

const ProductDetail_Screen = ({navigation, route}) => {
  const [item, setItem] = useState(route.params.item);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={true}
      visible={visible}
      code={<Components navigationComponents={navigation} dataRoute={item} />}
    />
  );
};

const Components = ({navigationComponents, dataRoute}) => {
  const {txt, img, view_img, parent} = styles;
  return (
    <ScrollView>
      <View style={parent}>
        <View style={view_img}>
          <Image
            source={{uri: dataRoute.img}}
            style={img}
            resizeMode="stretch"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              margin: 10,
            }}
            onPress={() => {
              navigationComponents.goBack();
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.26)',
                borderRadius: 50,
              }}>
              <Icon name="chevron-back-outline" size={35} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{padding: 10, width: '100%', height: '100%'}}>
          <ScalableText
            style={{fontSize: 23, fontWeight: 'bold', color: '#309045'}}>
            {dataRoute.title}
          </ScalableText>
          <ScalableText style={txt}>Liên hệ: 02623 821 888</ScalableText>
          <ScalableText style={txt}>Mô tả:</ScalableText>
          <ScalableText
            style={[txt, {color: '#6d6b6b', ScalableTextAlign: 'justify'}]}>
            {dataRoute.subtitle}
          </ScalableText>
        </View>
      </View>
      <CallButton />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: Response_Size('hg', 0, 97),
    backgroundColor: 'white',
  },
  view_img: {
    width: '100%',
    height: Response_Size('hg', 0, 40),
  },
  img: {
    width: '100%',
    height: '100%',
  },
  txt: {
    fontSize: 17,
  },
});

export default ProductDetail_Screen;
