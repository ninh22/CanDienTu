import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemNhanVien from './Item_NhanVien';
const size = Dimensions.get("screen");
const DATA_NHANVIEN = [
    { id_NV: 0, ten_NV: "Nguyễn Hữu Hai", ngaysinh_NV: "01/04/2000", soCMND_NV: "241856547", sdt_NV: "0346508759", diachi_NV: "Eakar,DakLak", email_NV: "huuhai880@gmail.com", ngayvaolam_NV: "01/04/1989", id_loaiNV: "0" },
    { id_NV: 1, ten_NV: "Nguyễn Hữu Hai", ngaysinh_NV: "01/04/2000", soCMND_NV: "241856547", sdt_NV: "0346508759", diachi_NV: "Eakar,DakLak", email_NV: "huuhai880@gmail.com", ngayvaolam_NV: "01/04/1989", id_loaiNV: "0" },
    { id_NV: 2, ten_NV: "Phạm văn A", ngaysinh_NV: "01/04/2000", soCMND_NV: "241856547", sdt_NV: "0346508759", diachi_NV: "Eakar,DakLak", email_NV: "huuhai880@gmail.com", ngayvaolam_NV: "01/04/1989", id_loaiNV: "0" },
    { id_NV: 3, ten_NV: "Trần Thị B", ngaysinh_NV: "01/04/2000", soCMND_NV: "241856547", sdt_NV: "0346508759", diachi_NV: "Eakar,DakLak", email_NV: "huuhai880@gmail.com", ngayvaolam_NV: "01/04/1989", id_loaiNV: "0" },
];

function ListNhanVien() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA_NHANVIEN}
                renderItem={item => {
                    return (
                        <ItemNhanVien item={item}></ItemNhanVien>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 10,
    },

});

export default ListNhanVien;