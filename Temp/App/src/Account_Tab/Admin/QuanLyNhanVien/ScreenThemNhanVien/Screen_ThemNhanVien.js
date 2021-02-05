import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import HeaderThemNhanVien from './components/Header_ThemNhanVien';
import ItemInput from './components/Item_Input';
import ItemDatePicker from './components/Item_DatePicker';
import Item_Bottomsheet from './components/Item_Bottomsheet';
import Item_BottomThemLoaiNV from './components/Item_BottomThemLoaiNV';
const size = Dimensions.get("window");
function ScreenThemNhanVien(props) {
    const { navigation } = props;
    const [dateNgaySinh, setDateNgaySinh] = useState('');
    const [dateNgayVaoLam, setNgayVaoLam] = useState('');
    const [title,setTitle]= useState('');
    const [keyBottom,setKeyBottom]= useState(0);
    const refRBSheet = useRef("ScreenBottom");
    const refRBSheetAddLoaiNV=useRef("ScreenAddLoaiNV")
    const onchangeNgaySinh = (date) => {
        setDateNgaySinh(date);
    }
    const onchangeNgayVaoLam = (date) => {
        setNgayVaoLam(date)
    }

    function checkValidation() {
        alert("aaaaaa")
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#309045" />
            <HeaderThemNhanVien navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.view_addNhanVien}>
                <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Tên nhân viên"}
                        placeholder={"Nhập tên nhân viên"}
                    />
                    <ItemDatePicker
                        date={dateNgaySinh}
                        title={"Ngày sinh"}
                        placeholder={"dd/MM/YYYY"}
                        onDateChange={(date) => onchangeNgaySinh(date)}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"CMND/CCCD"}
                        placeholder={"Nhập số chứng minh"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Số điện thoại"}
                        placeholder={"Nhập số điện thoại"}
                    />
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Địa chỉ"}
                        placeholder={"Địa chỉ"}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <ItemInput
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    refRBSheet.current.open();
                                    setTitle('Tỉnh/Thành phố');
                                    setKeyBottom(1);
                                }}
                                title={"Tỉnh/Thành phố"}
                                placeholder={"Tỉnh/Thành phố"}
                            />
                        </View>
                        <View style={{ marginLeft: 5, flex: 1 }}>
                            <ItemInput
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    refRBSheet.current.open();
                                    setTitle('Quận/Huyện');
                                    setKeyBottom(2);
                                }}
                                title={"Quận/Huyện"}
                                placeholder={"Quận/Huyện"}
                            />

                        </View>
                        <View style={{ flex: 1, marginLeft: 5, }}>
                            <ItemInput
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    refRBSheet.current.open();
                                    setTitle('Phường/Xã');
                                    setKeyBottom(3);
                                }}
                                title={"Phường/Xã"}
                                placeholder={"Phường/Xã"}
                            />
                        </View>
                    </View>
                    <ItemInput
                        readOnly={true}
                        dropdown={false}
                        title={"Email"}
                        placeholder={"Nhập email"}
                    />
                    <ItemDatePicker
                        date={dateNgayVaoLam}
                        title={"Ngày vào làm"}
                        placeholder={"dd/MM/YYYY"}
                        onDateChange={(date) => onchangeNgayVaoLam(date)}
                    />
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <ItemInput
                            readOnly={false}
                            dropdown={true}
                            onPress={() => {
                                refRBSheet.current.open();
                                setTitle('Loại nhân viên');
                                setKeyBottom(4);
                            }}
                            title={"Loại nhân viên"}
                            placeholder={"Chọn loại nhân viên"}
                        />
                        <TouchableOpacity onPress={() => refRBSheetAddLoaiNV.current.open()} style={styles.button_addLoaiNhanVien}>
                            <Image resizeMode={"cover"} style={styles.image_addLoaiNhanVien} source={require('../../../../Images/Icons/icons_plus.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => checkValidation()} style={styles.button_addNhanVien}>
                        <Text style={{ fontWeight: "bold", color: "green", fontSize: 16 }}>Thêm nhân viên</Text>
                    </TouchableOpacity>
                </View>
                {/* bottom view */}
                <RBSheet
                    height={size.height * 0.5}
                    ref={refRBSheet}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <Item_Bottomsheet
                        onPress={() => refRBSheet.current.close()}
                        title={title}
                        key={keyBottom}
                    />
                </RBSheet>
                <RBSheet
                    height={size.height * 0.3}
                    ref={refRBSheetAddLoaiNV}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <Item_BottomThemLoaiNV
                        onPress={() => refRBSheetAddLoaiNV.current.close()}
                        title={"Thêm loại nhân viên"}
                        key={3}
                    />
                </RBSheet>
            </ScrollView>
        </SafeAreaView>
    );
}
export default ScreenThemNhanVien;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    view_addNhanVien: {
        flex: 1
    },
    button_addLoaiNhanVien: {
        height: 40,
        width: 45,
        marginLeft: 10,
        backgroundColor: "rgba(168,230,207,0.5)",
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    image_addLoaiNhanVien: {
        height: 20,
        width: 20,
        tintColor: "green",
    },
    button_addNhanVien: {
        height: 45,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: "rgba(168,230,207,0.5)"
    }
});