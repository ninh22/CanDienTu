import React from 'react';
import { Image } from 'react-native';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const size = Dimensions.get('window');
function BottomDetailNv(props) {
    const { onPress,item } = props;
    return (
        <View style={styles.container}>
            <View style={styles.view_header}>
                <View style={styles.buttonclick} >
                </View>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 11, color: "gray" }}></Text>
                </View>

                <TouchableOpacity style={styles.buttonclick} onPress={onPress}>
                    <Image resizeMode={'cover'} style={styles.image_close} source={require('../../../../../Images/Icons/icons_closebottom.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.view_content}>

                <View style={{ flex: 1}}>
                    <ScrollView>
                        <View style={styles.view_detail}>
                            <View style={styles.view_avatar}>
                                <Text>{item.ten_NV.substr(0, 1).toUpperCase()}</Text>
                            </View>
                            <Text style={styles.title_name}>{item.ten_NV}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.view_buttonbottom}>
                    <TouchableOpacity style={styles.view_onclick} onPress={()=>alert('Xoá nhân viên')}>
                        <Image style={[styles.image_chucnang, { tintColor: 'red' }]} source={require('../../../../../Images/Icons/icons_deletedetail.png')}></Image>
                        <Text style={{ color: 'red' }}>Xoá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.view_onclick} onPress={()=>alert('Sửa thông tin')}>
                        <Image style={styles.image_chucnang} source={require('../../../../../Images/Icons/icons_edit.png')}></Image>
                        <Text>Sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );

}
export default BottomDetailNv;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    view_header: {
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        backgroundColor: 'white',
    },
    buttonclick: {
        height: "100%",
        width: 50,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 15,
    },
    image_close: {
        width: 20,
        height: 20,
        tintColor: 'gray',
    },
    view_content: {
        backgroundColor: 'white',
        flex: 1,
    },
    view_detail: {
        alignItems: "center",
        justifyContent: 'flex-start',
        paddingVertical: 10,
    },
    view_avatar: {
        height: 70,
        width: 70,
        backgroundColor: '#EEEEEE',
        borderRadius: 35,
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 10,
    },
    title_name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    view_buttonbottom: {
        height: 53,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    image_chucnang: {
        height: 21,
        width: 21,
        tintColor: 'black',
        marginBottom: 3,

    },
    view_onclick: {
        marginHorizontal: 25,
    }
});