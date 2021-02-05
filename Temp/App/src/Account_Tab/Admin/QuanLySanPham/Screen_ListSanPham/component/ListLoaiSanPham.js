import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import ItemLoaiSanPham from './Item_LoaiSanPham';
const size = Dimensions.get('window');
const DATA_LOAISANPHAM = [
    { id_LoaiSP: 0, ten_SP: "Tất cả", },
    { id_LoaiSP: 2, ten_SP: "Sản phẩm 2 ở đây nha", },
    { id_LoaiSP: 3, ten_SP: "Sản phẩm 3", },
];
function ListLoaiSanPham({ navigation }) {
    const [vitri,setViTri]=useState(0);
    function onclickViTri(vitri){
        setViTri(vitri);
    }
    return (
        <View style={styles.container}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={DATA_LOAISANPHAM}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => onclickViTri(item.id_LoaiSP)}>
                            <ItemLoaiSanPham vitri={vitri} item={item} />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
export default ListLoaiSanPham;
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        height: 50,
    }
});