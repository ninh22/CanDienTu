import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const size = Dimensions.get("window");

function BottomSheet(props) {
    const { onPress,title,key } = props
    return (
        <View>
            <View style={styles.view_header}>
                <TouchableOpacity style={styles.buttonclick} onPress={onPress}>
                    <Text style={{color:"red",fontSize:15}}>Huỷ</Text>
                </TouchableOpacity>
                <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{fontSize:11,color:"gray"}}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.buttonclick} onPress={onPress}>
                    <Text style={{color:"green",fontSize:15}}>Chọn</Text>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList>

                </FlatList>
            </View>
        </View>
    );

}
export default BottomSheet;
const styles=StyleSheet.create({
    view_header:{
        height:40,
        flexDirection:"row",
        alignItems:"center",
        marginBottom:5,
       
    },
    buttonclick:{
        height:"100%",
        width:80,
        justifyContent:"center",
        alignItems:"center"
    }
});