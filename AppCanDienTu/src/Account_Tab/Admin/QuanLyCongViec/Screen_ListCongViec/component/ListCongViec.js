import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import {connect} from 'react-redux';
function ListCongViec(props) {
    console.log(props.DATA_WORK);
    return (
        <View style={styles.container}>

        </View>
    );
}
function mapStateToProps(state){
    return {DATA_WORK:state.WorkReducer.arrayListWork};
}

export default connect(mapStateToProps) (ListCongViec);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    }
})