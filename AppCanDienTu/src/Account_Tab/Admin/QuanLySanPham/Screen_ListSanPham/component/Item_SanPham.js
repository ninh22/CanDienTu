import React from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';
const size = Dimensions.get('window');
function ItemSanPham(props) {
    const { item } = props.item;
    return (
        <View style={styles.container}>
            <View style={styles.view_image}>
                <Image resizeMode={"cover"} style={styles.image_sanpham} source={{ uri: item.hinhanh_SP }} />
            </View>
            <View style={styles.view_thongtin}>
                <Text style={styles.title_tensanpham}>{item.ten_SP}</Text>
            </View>
        </View>
    );
}
export default ItemSanPham;
const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: "white",
        borderRadius: 2.22,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 2,
        marginHorizontal: 7,
        marginBottom: 10,
        flexDirection: "row",

    },
    view_image: {
        height: "100%",
        width: 120,
        borderRadius: 5,

    },
    image_sanpham: {
        height: "100%",
        width: "100%",

    },
    view_thongtin: {
        
        flex: 1,
        padding:5,
    },
    title_tensanpham:{
        fontWeight:'bold',
        fontSize:15,
        
    }
});