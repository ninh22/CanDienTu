import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
const size = Dimensions.get('window');
function ListDateOnMonth(props) {
    const { navigation } = props;
    const [vitri, setViTri] = useState(1);
    const [dateofmonth, setDateOfMonth] = useState([]);
    useEffect(() => {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var date = new Date().getDate();
        var daysInMonth = new Date(year, month, 1, -1).getDate();
        var dataDateOfMonth = [];
        for (var i = 1; i <= daysInMonth; i++) {
            dataDateOfMonth.push({
                Id: i,
                time: i,
                day: 'Th',
            });
        }
        // for (var j = dataDateOfMonth.length - 1; j >= 1; j--) {
        //     if (
        //         dataDateOfMonth[j].time > new Date().getDate()
        //     ) {

        //         dataDateOfMonth.splice(j, 1);
        //     }
        // }
        setDateOfMonth(dataDateOfMonth);
        setViTri(date);
    }, [vitri]);

    return (
        <View style={styles.container}>
            <View style={styles.view_selectmonth}>
                <TouchableOpacity style={styles.button_month}>
                    <Text>{'<<'}</Text>
                </TouchableOpacity>
                <Text>Tháng {new Date().getMonth() + 1}</Text>
                <TouchableOpacity style={[styles.button_month, { marginLeft: 25 }]}>
                    <Text>{'>>'}</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={dateofmonth}
                renderItem={(item) => {
                    return (
                        <View style={[
                            styles.view_time,
                            {
                                backgroundColor: vitri == item.item.time ? "rgb(168,230,207)" : 'white',
                                shadowColor: vitri == item.item.time ? "rgb(168,230,207)" : '#000000',
                            }
                        ]}>
                            <Text style={[styles.title_namedate, { color: vitri == item.item.time ? "white" : '#DDDDDD' }]}>{item.item.day}</Text>
                            <Text style={[styles.title_date, { color: vitri == item.item.time ? "white" : 'gray' }]}>{item.item.time}</Text>
                            {vitri == item.item.time ? <View style={styles.view_checkdate}></View> : null}
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
export default ListDateOnMonth;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginVertical: 5,
        padding: 5,
    },
    view_time: {
        height: 70,
        width: 50,
        marginHorizontal: 5,
        borderRadius: 5,
        padding: 5,
        justifyContent: "center",
        alignItems: 'center',

        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        marginVertical: 5,
    },
    title_namedate: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 11,
        marginBottom: 3,
    },
    title_date: {
        fontSize: 20,
        color: 'white',
        fontWeight: "bold"
    },
    view_checkdate: {
        width: "50%",
        height: 3,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop: 10,
    },
    button_month: {
        width: 60,
        height: 30,
        marginRight: 25,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#DDDDDD"
    },
    view_selectmonth: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        flexDirection: 'row',
    },


});