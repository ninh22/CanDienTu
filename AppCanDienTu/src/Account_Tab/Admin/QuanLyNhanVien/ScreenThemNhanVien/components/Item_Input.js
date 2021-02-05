import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, TextInput, StatusBar, TouchableOpacity, Text, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
function ItemInput(props) {
    const { title, placeholder, dropdown, readOnly, onPress, onchange, value } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.view_title}>{title}</Text>
            <View style={styles.view_input}>
                {dropdown == true ?
                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                        <TextInput
                            value={value}
                            editable={readOnly}
                            style={{ flex: 1, color: 'black' }}
                            placeholder={placeholder}

                        ></TextInput>
                    </TouchableOpacity>
                    :
                    <TextInput
                        value={value}
                        editable={readOnly}
                        style={{ flex: 1 }}
                        placeholder={placeholder}
                        onChangeText={onchange}
                    ></TextInput>}

                {dropdown == true ? <Image style={styles.image_dropdown} source={require('../../../../../Images/Icons/icons_sortdown.png')}></Image> :
                    null}
            </View>
        </View>
    );
}
export default ItemInput;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "column",
        marginBottom: 10,
        flex: 1,
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
    image_dropdown: {
        height: 12,
        width: 12,
        marginRight: 5,
    }
});