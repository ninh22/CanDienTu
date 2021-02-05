import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const size = Dimensions.get("window");

function BottomSheetThemLoaiNV(props) {
    const { onPress, title, key } = props
    return (
        <View>
            <View style={styles.view_header}>
                <View style={styles.buttonclick} >
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 11, color: "gray" }}>{title}</Text>
                </View>
                <TouchableOpacity style={styles.buttonclick} onPress={onPress}>
                    <Text style={{ color: "green", fontSize: 15 }}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: 16 }}>
                <Text style={styles.view_title}>Loại nhân viên</Text>
                <View style={styles.view_input}>
                    <TextInput

                        style={{ flex: 1 }}
                        placeholder={"Nhập loại nhân viên"}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.button_addLoaiNhanVien}>
                    <Text style={{ fontWeight: "bold", color: "green", fontSize: 16 }}>Thêm loại nhân viên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}
export default BottomSheetThemLoaiNV;
const styles = StyleSheet.create({
    view_header: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,

    },
    buttonclick: {
        height: "100%",
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    view_title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 7
    },
    view_input: {
        height: 40,
        borderWidth: 0.5,
        borderColor: "#CCCCCC",
        borderRadius: 5,
        padding: 3,
        flexDirection: "row",
        alignItems: "center"
    },
    button_addLoaiNhanVien: {
        height: 45,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: "rgba(168,230,207,0.5)",
    }
});