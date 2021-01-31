import React, { useEffect, useState, useRef } from 'react';
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderThemSanPham from './component/Header_ThemSanPham';
import ItemInput from './component/Item_Input';
const size = Dimensions.get('window');

function ScreenThemSanPham(props) {
    const { navigation } = props;
    const refRBSheet = useRef("ScreenLoaiSanPham");
    const refRBSheetAddLoaiSP = useRef('ScreenThemLoaiSanPham');
    const [ArrayImage, setArrayImage] = useState([{ id_Image: 0, name_Image: "" }]);
    // const [imagePicker, setImagePicker] = useState(null);
    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
               
                var newArrayImage = [...ArrayImage];
                newArrayImage[0].name_Image = response.uri;
                setArrayImage(newArrayImage);
                console.log(ArrayImage);
            }
        });

    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderThemSanPham navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Tên sản phẩm"}
                        placeholder={"Nhập tên sản phẩm"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Kích thước"}
                        placeholder={"Nhập kích thước"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Mức cân"}
                        placeholder={"Nhập mức cân"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Phân độ cân"}
                        placeholder={"Nhập phân độ cân"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Đơn giá"}
                        placeholder={"Nhập đơn giá"}
                    />
                    <Text style={styles.view_title}>Hình ảnh</Text>
                    <View style={styles.view_hinhanh}>

                        <FlatList
                            horizontal={true}
                            data={ArrayImage}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        { item.name_Image== '' ? <TouchableOpacity onPress={() => launchImageLibrary()}>
                                        <View style={styles.view_selectImage}>
                                            <Image resizeMode={"cover"} style={styles.image_addImage} source={require('../../../../Images/Icons/icons_plus.png')}></Image>
                                        </View>
                                    </TouchableOpacity> :
                                        <TouchableOpacity onPress={() => launchImageLibrary()}>
                                            <View style={styles.view_selectImage}>
                                                <Image resizeMode={"cover"} style={{ height: 120, width: 120 }} source={{ uri: item.name_Image }}></Image>
                                            </View>
                                        </TouchableOpacity>}
                                    </View>
                                );
                            }}
                            keyExtractor={(item) => item.id_Image}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <ItemInput
                            readOnly={false}
                            dropdown={true}
                            onPress={() => {
                                refRBSheet.current.open();
                                setTitle('Loại sản phẩm');
                                setKeyBottom(4);
                            }}
                            title={"Loại sản phẩm"}
                            placeholder={"Chọn loại sản phẩm"}
                        />
                        <TouchableOpacity onPress={() => refRBSheetAddLoaiNV.current.open()} style={styles.button_addLoaiSP}>
                            <Image resizeMode={"cover"} style={styles.image_addLoaiSanPham} source={require('../../../../Images/Icons/icons_plus.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => checkValidation()} style={styles.button_addSanPham}>
                        <Text style={{ fontWeight: "bold", color: "green", fontSize: 16 }}>Thêm sản phẩm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default ScreenThemSanPham;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    content: {
        flex: 1,
        padding: 10,
    },
    view_title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 7
    },
    image_addLoaiSanPham: {
        height: 20,
        width: 20,
        tintColor: "green",
    },
    button_addLoaiSP: {
        height: 40,
        width: 45,
        marginLeft: 10,
        backgroundColor: "rgba(168,230,207,0.5)",
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    button_addSanPham: {
        height: 45,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: "rgba(168,230,207,0.5)"
    },
    view_hinhanh: {
        height: 120,
        marginBottom: 10,
    },
    view_selectImage: {
        height: "100%",
        width: 120,
        borderRadius: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CCCCCC",

    },
    image_addImage: {
        height: 30,
        width: 30,
        tintColor: "gray",
    }
});