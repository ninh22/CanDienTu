import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import HeaderThemSanPham from './component/Header_ThemSanPham';
const size = Dimensions.get('window');
function ScreenThemSanPham(props) {
    const {navigation}=props;
    return (
        <SafeAreaView style={styles.container}>
            <HeaderThemSanPham navigation={navigation}/>
            <View style={styles.content}>

            </View>
        </SafeAreaView>
    );
}
export default ScreenThemSanPham;
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        flex:1,
        backgroundColor:"red",
    }
});