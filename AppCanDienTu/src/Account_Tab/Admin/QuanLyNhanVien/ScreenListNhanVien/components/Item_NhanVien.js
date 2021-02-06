import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomDetailNv from './Item_BottomDetailNv';


const size = Dimensions.get("screen");
function ItemNhanVien(props) {
    const { item } = props.item;
    const refRBSheetDetailNV = useRef("ChiTietNhanVien");
    return (
        <TouchableOpacity style={style_nhanvien.view_container} onPress={() => refRBSheetDetailNV.current.open()}>
            <View style={style_nhanvien.image_avata}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>{item.ten_NV.substr(0, 1).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={style_nhanvien.title_tennhanvien}>{item.ten_NV}</Text>
                <View style={{ flexDirection: "row", marginBottom: 7 }}>
                    <Image style={[style_nhanvien.image_thongtin, { tintColor: "#309045" }]} source={require('../../../../../Images/Icons/icons_phone.png')} resizeMode={"cover"}></Image>
                    <Text>{item.sdt_NV}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <Image style={style_nhanvien.image_thongtin} source={require('../../../../../Images/Icons/icons_diachi.png')} resizeMode={"cover"}></Image>
                    <Text>{item.diachi_NV}</Text>
                </View>
            </View>
            {/*bottom thông tin nhân viên */}
            <RBSheet
                height={size.height * 0.7}
                ref={refRBSheetDetailNV}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }
                }}
                closeOnPressMask={true}>

                <BottomDetailNv item={item} onPress={()=>refRBSheetDetailNV.current.close()}/>

            </RBSheet>
        </TouchableOpacity>
    );
}
export default ItemNhanVien;
const style_nhanvien = StyleSheet.create({
    view_container: {
        backgroundColor: "white",
        height: 100,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        marginHorizontal: 7,
        borderRadius: 5,
        flexDirection: "row",
        padding: 5,
        alignItems: "center"
    },
    image_avata: {
        width: 60,
        height: 60,
        backgroundColor: "#EEEEEE",
        marginRight: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    image_thongtin: {
        width: 15,
        height: 15,
        tintColor: "red",
        marginRight: 3,
    },
    view_menu: {
        width: 20,
        height: "100%",
        alignItems: "flex-end",
        marginLeft: 10,
    },
    image_menu: { height: 20, width: 20 },
    title_tennhanvien: { fontSize: 17, fontWeight: "bold", marginBottom: 10 },
});
