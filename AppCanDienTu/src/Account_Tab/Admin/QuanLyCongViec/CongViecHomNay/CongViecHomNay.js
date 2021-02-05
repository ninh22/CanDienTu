import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet,Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemCongViec from './component/Item_ListCongviec';
const size=Dimensions.get("screen");
const DATA_CONGVIEC=[
    {id:1,Ten:"Công việc một",loaicongviec:"rgba(168,230,207,0.2)",color:'rgb(168,230,207)',status:1},
    {id:2,Ten:"Tên công việc hai",loaicongviec:"rgba(255,127,80,0.2)",color:'rgb(255,127,80)',status:0},
    {id:3,Ten:"Tên công việc ba",loaicongviec:"rgba(132,193,255,0.2)",color:'rgb(132,193,255)',status:0},
];

function CongViecHomNay() {
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA_CONGVIEC}
                renderItem={(item)=><ItemCongViec item={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
    }
});

export default CongViecHomNay;