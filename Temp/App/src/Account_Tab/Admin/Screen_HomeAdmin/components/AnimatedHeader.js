import React from 'react';
import { Dimensions,StyleSheet } from 'react-native';
import { Animated, View, Image,Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const size=Dimensions.get("window");
const HEADER_HEIGHT = size.height*0.25;
const IMAGE_HEIGHT=150;
const AnimatedHeader = ({ animatedValue }) => {
  const insets = useSafeAreaInsets();
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 45],
    extrapolate: 'clamp'
  });
  const headerHeightImage = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT + insets.top],
    outputRange: [IMAGE_HEIGHT + insets.top, insets.top],
    extrapolate: 'clamp'
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
        backgroundColor: '#309045',
        justifyContent:"center",
        alignItems:"center",
      }}>
      <Animated.View style={{height:insets.top + 45,width:"100%",justifyContent:"flex-start",alignItems:"center",paddingHorizontal:10,flexDirection:"row"}}>
        <Text style={{flex:1,fontWeight:"bold",color:"white",fontSize:17}}>Xin chào! Nguyễn Hữu Hai</Text>
        <Image style={{ width: 23, height: 23 }} source={require('../../../../Images/Icons/icons_notification.png')} />
      </Animated.View>
      <Animated.Image resizeMode={"center"}  style={{ width: "60%", height: headerHeightImage,tintColor:"white" }} source={require('../../../../Images/logo1.png')} />
    </Animated.View>
  );
};

export default AnimatedHeader;
