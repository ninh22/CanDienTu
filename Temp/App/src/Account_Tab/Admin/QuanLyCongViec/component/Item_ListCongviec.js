import React, { useState, useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const size = Dimensions.get("screen");
function ItemCongViec(props) {
    const { item } = props.item;
    return (
        <View style={style_congViec.view_congviec}>
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    {/* <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        
                        <View style={{ height: 5,width:5,backgroundColor: "#ff6f69", borderRadius: 10 }}></View>
                        <View>Chưa hoàn thành</View>
                    </View> */}
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginBottom: 5 }}>{item.Ten}</Text>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Text>Bắt đầu: </Text>
                        <Text>07:12 15/10/2020</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                        <Text>Hạn: </Text>
                        <Text>20:16 15/10/2020</Text>
                    </View>
                </View>
                <View style={{ height: 20, flexDirection: "row", marginBottom: 3 }}>
                    <View style={{ width: 20, height: "100%", alignItems: "flex-end", marginLeft: 10 }}>
                        <TouchableOpacity onPress={() => alert("thông tin")}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../../../Images/Icons/icons_menu.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ height: 30, marginTop: 3, flexDirection: "row" }}>
                <View style={[style_congViec.view_tagcongviec, { backgroundColor: item.loaicongviec }]}>
                    <Text style={style_congViec.title_tagcongviec}>Việc khác</Text>
                </View>
                <View style={{ flex: 1 }}>

                </View>
            </View>
        </View>
    );
}
export default ItemCongViec;

const style_congViec = StyleSheet.create({
    view_congviec: {
        height: 120,
        width: "100%",
        marginBottom: 10,
        borderRadius: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: "#DDDDDD",
    },
    view_tagcongviec: {
        height: 30,
        justifyContent: "center",
        backgroundColor: "red",
        borderRadius: 4,
        paddingVertical:5,
        paddingHorizontal:10,
    },
    title_tagcongviec: {
        fontWeight: "bold",
        color:"black"
    }
});