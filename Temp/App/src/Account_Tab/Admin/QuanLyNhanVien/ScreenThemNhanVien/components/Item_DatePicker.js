import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Text, } from 'react-native';
import DatePicker from 'react-native-datepicker'
function ItemDatePicker(props) {
    const { title, placeholder,onDateChange,date } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.view_title}>{title}</Text>
            <View style={styles.view_input}>
                <Image style={styles.image_datepicker} source={require('../../../../../Images/Icons/icons_calendar.png')}></Image>
                <DatePicker
                    style={styles.datepicker}
                    date={date}
                    placeholder={placeholder}
                    format="DD/MM/YYYY"
                    showIcon={false}
                    onDateChange={onDateChange}
                    customStyles={{ dateInput: { borderWidth: null, alignItems: "flex-start" } }}
                ></DatePicker>
            </View>
        </View>
    );
}
export default ItemDatePicker;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "column",
        marginBottom: 10,
        width: "100%",
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
        flexDirection: 'row',

        alignItems: "center"
    },
    image_datepicker: {
        height: 17,
        width: 17,
        marginHorizontal: 7,
    },
    datepicker: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    }
});