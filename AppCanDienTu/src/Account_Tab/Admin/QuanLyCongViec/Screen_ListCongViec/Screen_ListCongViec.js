import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderCongViec from './component/Header_CongViec';
import ListDateOnMonth from './component/ListDateOnMonth';
const size = Dimensions.get('window');
function ScreenListCongViec(props) {
    const { navigation } = props;
    return (
        <SafeAreaView style={styles.container}>
            <HeaderCongViec navigation={navigation} />
            <View style={styles.content}>
                <ListDateOnMonth />
                <View style={styles.view_listcongviec}>
        
                </View>
            </View>
        </SafeAreaView>
    );
}
export default ScreenListCongViec;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    view_listcongviec:{
        flex:1,
        backgroundColor:'white',
    }
});