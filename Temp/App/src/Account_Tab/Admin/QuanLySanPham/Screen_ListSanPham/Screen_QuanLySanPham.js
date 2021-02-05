import React, { useState, useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, SafeAreaView, Image, TextInput, StatusBar, TouchableOpacity, Text, FlatList } from 'react-native';
import HeaderSanPham from './component/Header_SanPham';
import Screen_ListSanPham from './component/Screen_ListSanPham';
import ListLoaiSanPham from './component/ListLoaiSanPham';
const size = Dimensions.get("window");
function ScreenListSanPham(props) {
    const { navigation } = props;
    const [searchValue, setSearchValue] = useState('');
    const typingTimeOutRef = useRef(null);
    const SearchSanPham = (value) => {
        setSearchValue(value);
        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current)
        };
        typingTimeOutRef.current = setTimeout(() => {
            console.log(value)
        }, 400);

    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#309045" />
            <HeaderSanPham navigation={navigation} />
            <View style={styles.view_content}>
                <View style={{ backgroundColor: "white", marginTop: 5 }}>
                    <View style={styles.view_timkiem}>
                        <TextInput
                            value={searchValue}
                            style={{ flex: 1, fontSize: 13, margin: 5, fontWeight: "bold", height: 40 }} placeholder='Tìm kiếm...'
                            onChangeText={value => SearchSanPham(value)}>
                        </TextInput>
                        <TouchableOpacity>
                            <View style={{ borderLeftWidth: 1, paddingHorizontal: 5 }}>
                                <Image style={styles.image_search} source={require("../../../../Images/Icons/icons_search.png")}></Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 60,justifyContent:"flex-end",marginTop: 5,backgroundColor:"white"}}>
                        <ListLoaiSanPham />
                    </View> 
                <View style={{ flex: 1, backgroundColor: "white", marginTop: 5 }}>
                    
                    <Screen_ListSanPham />
                </View>
            </View>
        </SafeAreaView>
    );
}
export default ScreenListSanPham;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DCDCDC"
    },
    view_content: {
        flex: 1,
        flexDirection: 'column',
    },
    view_timkiem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DCDCDC',
        height: 35,
        paddingHorizontal: 10,
        borderRadius: 22,
        marginHorizontal: 16,
        marginVertical: 10,
    },
    image_search: {
        height: 20,
        width: 20,
        marginRight: 5,
        tintColor: "#309045"
    },
});