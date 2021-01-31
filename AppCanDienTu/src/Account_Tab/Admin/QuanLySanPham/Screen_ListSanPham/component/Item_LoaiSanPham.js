import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const size = Dimensions.get('window');
function ItemLoaiSanPham(props) {
    const { item, vitri } = props;

    return (
        <View style={[styles.container, { backgroundColor: vitri == item.id_LoaiSP ? 'green' : "white", borderColor: vitri == item.id_LoaiSP ? 'green' : "#DDDDDD" }]}>
            <View style={styles.view_thongtin}>
                <Text style={[styles.title_tensanpham, { color: vitri == item.id_LoaiSP ? 'white' : "black",fontWeight:vitri == item.id_LoaiSP ? 'bold' : "normal" }]}>{item.ten_SP}</Text>
                
            </View>
        </View>
    );
}
export default ItemLoaiSanPham;
const styles = StyleSheet.create({
    container: {
        height: 40,

        borderRadius: 5,
        flexDirection: "row",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDDDDD",
        paddingHorizontal: 10,
    },
    view_thongtin: {
        flex: 1,
        padding: 5,
    },

});