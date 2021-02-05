import React, { useState, useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const size = Dimensions.get("screen");
function ItemCongViec(props) {
    const { item } = props.item;
    return (
        <View style={[style_congViec.view_congviec, { backgroundColor: item.loaicongviec }]}>
            <View style={[style_congViec.view_left, { backgroundColor: item.color }]}>
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1, padding: 10, }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold", marginBottom: 10, color: "#3b5998" }}>{item.Ten}</Text>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={style_congViec.title_time}>Time: 07:12 AM - 07:12 PM</Text>
                            <Text style={style_congViec.title_time}>Ngày: 15/01/2021 </Text>
                        </View>
                    </View>
                    <View style={{ height: '100%', flexDirection: "row", padding: 5 }}>
                        <View style={{ width: 20, height: "100%", alignItems: "flex-start", marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => alert("thông tin")}>
                                <Image style={{ height: 20, width: 20 }} source={require('../../../../../Images/Icons/icons_menu.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ height: 40, justifyContent: "center", alignItems: "flex-end", padding: 5, }}>
                    {item.status == 1 ? <View style={
                        style_congViec.view_succes}>
                        <Image style={{ width: 13, height: 13, tintColor: "white", marginRight: 5 }} source={require('../../../../../Images/Icons/icons_checked.png')}></Image>
                        <Text style={{ color: 'white' }}>Hoàn thành</Text>
                    </View> :
                        null
                    }
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
        marginBottom: 15,
        borderRadius: 5,
        flexDirection: 'row',
    },
    view_left: {
        height: "100%",
        width: 6,
        backgroundColor: "red",
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    title_time: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 3,
        color: 'gray'
    },
    view_succes: {
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "green",
        borderRadius: 3,
        flexDirection: "row"

    },
});