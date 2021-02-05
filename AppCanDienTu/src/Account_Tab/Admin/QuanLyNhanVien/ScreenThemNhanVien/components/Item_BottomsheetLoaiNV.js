import React, { useRef, useState, useEffect } from 'react';
import { View, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const size = Dimensions.get("window");

function BottomSheetLoaiNV(props) {
    const { onPress, title, key, data, getfunction } = props;
    const [checkvitri, setcheckvitri] = useState('');
    const [namelocation, setNameLoaction] = useState('');
    return (
        <View style={{ flexDirection: 'column', flex: 1 }}>
            <View style={styles.view_header}>
                <TouchableOpacity style={styles.buttonclick} onPress={onPress}>
                    <Text style={{ color: "red", fontSize: 15 }}>Huỷ</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 11, color: "gray" }}>{title}</Text>
                </View>
                {checkvitri != '' ?
                    <TouchableOpacity style={styles.buttonclick} onPress={() =>{
                        getfunction(checkvitri, namelocation);
                        
                    }}>
                        <Text style={{ color: "green", fontSize: 15 }}>Chọn</Text>
                    </TouchableOpacity> :
                    <View style={styles.buttonclick}></View>
                }
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={(item) => {
                        return (
                            <TouchableOpacity onPress={() => {

                                setcheckvitri(item.item.id_loaiNV);
                                setNameLoaction(item.item.ten_loaiNV);

                            }}>
                                <View style={[styles.view_item, { backgroundColor: checkvitri == item.item.id_loaiNV ? 'rgba(168,230,207,0.2)' : null }]}>
                                    <Text style={{
                                        color:checkvitri == item.item.id_loaiNV ? 'green' : 'black',
                                        fontSize:15,
                                        fontWeight:checkvitri == item.item.id_loaiNV ? 'bold' : 'normal',
                                         }}>{item.item.ten_loaiNV}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>
            </View>
        </View>
    );

}
export default BottomSheetLoaiNV;
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
    view_item: {
        height: 40,
        marginBottom: 5,
        marginHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: '#DDDDDD',
        paddingHorizontal: 5,
        justifyContent: "center"
    },

});