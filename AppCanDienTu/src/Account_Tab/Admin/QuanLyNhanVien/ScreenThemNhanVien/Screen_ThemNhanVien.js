import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from "react-native-raw-bottom-sheet";
import { RNToasty } from 'react-native-toasty';
import moment from "moment";
import HeaderThemNhanVien from './components/Header_ThemNhanVien';
import ItemInput from './components/Item_Input';
import ItemDatePicker from './components/Item_DatePicker';
import Item_Bottomsheet from './components/Item_Bottomsheet';
import BottomSheetLoaiNV from './components/Item_BottomsheetLoaiNV';
import Item_BottomThemLoaiNV from './components/Item_BottomThemLoaiNV';
import host from '../../../../Server/host';
const size = Dimensions.get("window");
function ScreenThemNhanVien(props) {
    moment.locale('vi');
    const { navigation } = props;
    const [nameNhanVien, setnameNhanVien] = useState('');
    const [dateNgaySinh, setDateNgaySinh] = useState('');
    const [cmndNhanVien, setcmndNhanVien] = useState('');
    const [sdtNhanVien, setsdtNhanVien] = useState('');
    const [diachinhanvien, setDiaChiNhanVien] = useState('');
    const [tinhThanhPho, setTinhThanhPho] = useState('');
    const [quanhuyen, setQuanHuyen] = useState('');
    const [phuongxa, setPhuongXa] = useState('')
    const [emailNhanVien, setEmailNhanVien] = useState('');
    const [dateNgayVaoLam, setNgayVaoLam] = useState('');
    const [loainhanvien, setLoaiNhanVien] = useState('');
    const [idloainhanvien, setIdLoaiNhanVien] = useState('');
    const [dataTinhThanhPho, setDataTinhThanhPho] = useState([]);
    const [dataQuanHuyen, setDataQuanHuyen] = useState([]);
    const [dataPhuongXa, setDataPhuongXa] = useState([]);
    const [dataloainv, setDataLoaiNV] = useState([]);
    const [title, setTitle] = useState('');
    const [keyBottom, setKeyBottom] = useState(0);
    const refRBSheetTinhTP = useRef("ScreenBottomTP");
    const refRBSheetQH = useRef("ScreenBottomQH");
    const refRBSheetPX = useRef("ScreenBottomPX");
    const refRBSheetLoaiNV = useRef("ScreenBottomLoaiNV");
    const refRBSheetAddLoaiNV = useRef("ScreenAddLoaiNV");
    const [pagenumber, setPageNumber] = useState(1);
    const [numberlimit, setNumberLimit] = useState(10);
    const [visibleLoadMore, setvisibleLoadMore] = useState(false);
    const [viewloadingadd, setViewLoadingAdd] = useState(false);
    useEffect(() => {
        getAllCity();
        getLoaiNhanVien();
    }, []);
    const getAllCity = () => {
        fetch('https://raw.githubusercontent.com/huuhai880/tinhthanhphoAPI/master/dist/tinh_tp.json')
            .then((response) => response.json())
            .then((json) => {
                setDataTinhThanhPho([...Object.values(json)])
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const getLoaiNhanVien = () => {
        fetch(host.getAllLoaiNhanVien, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: pagenumber,
                limit: numberlimit,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                switch (responseJson.check) {
                    case 'notfull':
                        if (dataloainv.length == 0) {
                            setDataLoaiNV(responseJson.data);
                        } else {
                            setDataLoaiNV(dataloainv.concat(responseJson.data));
                        }
                        setvisibleLoadMore(false);
                        break;
                    case 'full':
                        if (dataloainv.length == 0) {
                            setDataLoaiNV(responseJson.data);
                        } else {
                            setDataLoaiNV(dataloainv.concat(responseJson.data));
                        }
                       
                        setvisibleLoadMore(false);
                        break;
                    case 'maxfull':
                        setvisibleLoadMore(false);
                        break;
                    default:
                        setDataLoaiNV([]);
                        setvisibleLoadMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function checkValidation() {
        addNewNhanVien();
    }
    function addNewNhanVien() {
        setViewLoadingAdd(true);
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        var date = new Date().getDate();
        var hour = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        var milliseconds = new Date().getMilliseconds();
        var ID_NV = 'NV-' + date + '' + month + '' + year + '' + hour + '' + minutes + '' + seconds + '' + milliseconds;
        fetch(host.addNhanVien, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_NV: ID_NV,
                ten_NV: nameNhanVien,
                ngaysinh_NV: moment(dateNgaySinh).format('YYYY-DD-MM'),
                soCMND_NV: cmndNhanVien,
                sdt_NV: sdtNhanVien,
                diachi_NV: diachinhanvien + ', ' + phuongxa + ', ' + quanhuyen + ', ' + tinhThanhPho,
                email_NV: emailNhanVien,
                ngayvaolam_NV: moment(dateNgayVaoLam).format('YYYY-DD-MM'),
                loai_NV: idloainhanvien,
            })

        })
            .then((response) => response.text())
            .then((textrespose) => {
                if (textrespose === 'success') {
                    setTimeout(() => {
                        RNToasty.Success({
                            title: 'Thêm nhân viên mới thành công',
                        });
                        setnameNhanVien('');
                        setDateNgaySinh('');
                        setcmndNhanVien('');
                        setsdtNhanVien('');
                        setDiaChiNhanVien('');
                        setPhuongXa('');
                        setQuanHuyen('');
                        setTinhThanhPho('');
                        setEmailNhanVien('');
                        setNgayVaoLam('');
                        setLoaiNhanVien('');
                        setViewLoadingAdd(false);
                    }, 1000);
                }else{
                    setViewLoadingAdd(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setViewLoadingAdd(false);
            });
    }
    const getQuanHuyen = (id_city, name_city) => {
        refRBSheetTinhTP.current.close();
        setTinhThanhPho(name_city);
        setQuanHuyen('');
        setPhuongXa('')
        fetch('https://raw.githubusercontent.com/huuhai880/tinhthanhphoAPI/master/dist/quan-huyen/' + id_city + '.json')
            .then((response) => response.json())
            .then((json) => {
                setDataQuanHuyen([...Object.values(json)])
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const getPhuongXa = (id_PhuongXa, name_quanhuyen) => {
        refRBSheetQH.current.close();
        setQuanHuyen(name_quanhuyen);
        setPhuongXa('')
        fetch('https://raw.githubusercontent.com/huuhai880/tinhthanhphoAPI/master/dist/xa-phuong/' + id_PhuongXa + '.json')
            .then((response) => response.json())
            .then((json) => {
                setDataPhuongXa([...Object.values(json)])

            })
            .catch((error) => {
                console.error(error);
            });
    }
    const setNamePhuongXa = (id_PhuongXa, name_phuongxa) => {
        refRBSheetPX.current.close();
        setPhuongXa(name_phuongxa)
    }
    const setNameLoaiNhanVien = (id_LoaiNhanVien, name_nhanvien) => {
        setLoaiNhanVien(name_nhanvien);
        setIdLoaiNhanVien(id_LoaiNhanVien)
        refRBSheetLoaiNV.current.close();
    }
    return (
        <SafeAreaView style={styles.container}>
            {viewloadingadd == true ? <View style={styles.view_loading}>
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        tintColor:"green"
                    }}
                    source={require('../../../../Images/loading/Spin-1s-200px.gif')}
                />
            </View> : null}
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#309045" />
            <HeaderThemNhanVien navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.view_addNhanVien}>
                <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
                    <ItemInput
                        value={nameNhanVien}
                        readOnly={true}
                        dropdown={false}
                        title={"Tên nhân viên"}
                        placeholder={"Nhập tên nhân viên"}
                        onchange={(value) => setnameNhanVien(value)}
                    />
                    <ItemDatePicker

                        date={dateNgaySinh}
                        title={"Ngày sinh"}
                        placeholder={"dd/MM/YYYY"}
                        onDateChange={(date) => setDateNgaySinh(date)}
                    />
                    <ItemInput
                        value={cmndNhanVien}
                        readOnly={true}
                        dropdown={false}
                        title={"CMND/CCCD"}
                        placeholder={"Nhập số chứng minh"}
                        onchange={(value) => setcmndNhanVien(value)}
                    />
                    <ItemInput
                        value={sdtNhanVien}
                        readOnly={true}
                        dropdown={false}
                        title={"Số điện thoại"}
                        placeholder={"Nhập số điện thoại"}
                        onchange={(value) => setsdtNhanVien(value)}
                    />
                    <ItemInput
                        value={diachinhanvien}
                        readOnly={true}
                        dropdown={false}
                        title={"Địa chỉ"}
                        placeholder={"Địa chỉ"}
                        onchange={(value) => setDiaChiNhanVien(value)}
                    />
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <ItemInput
                                value={tinhThanhPho}
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    refRBSheetTinhTP.current.open();
                                    setTitle('Tỉnh/Thành phố');
                                    setKeyBottom(1);
                                }}
                                title={"Tỉnh/Thành phố"}
                                placeholder={"Tỉnh/Thành phố"}
                            />
                        </View>
                        <View style={{ marginLeft: 5, flex: 1 }}>
                            <ItemInput
                                value={quanhuyen}
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    if (tinhThanhPho != '' || tinhThanhPho.length != 0) {
                                        refRBSheetQH.current.open();
                                        setTitle('Quận/Huyện');
                                        setKeyBottom(2);
                                    } else {
                                        RNToasty.Error({
                                            title: 'Vui lòng chọn Tỉnh/ Thành Phố',
                                        });
                                    }


                                }}
                                title={"Quận/Huyện"}
                                placeholder={"Quận/Huyện"}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5, }}>
                            <ItemInput
                                value={phuongxa}
                                readOnly={false}
                                dropdown={true}
                                onPress={() => {
                                    if (tinhThanhPho != '' || tinhThanhPho.length != 0) {
                                        refRBSheetPX.current.open();
                                        setTitle('Phường/Xã');
                                        setKeyBottom(3);
                                    } else {
                                        RNToasty.Error({
                                            title: 'Vui lòng chọn Quận/Huyện',
                                        });
                                    }

                                }}
                                title={"Phường/Xã"}
                                placeholder={"Phường/Xã"}
                            />
                        </View>
                    </View>
                    <ItemInput
                        value={emailNhanVien}
                        readOnly={true}
                        dropdown={false}
                        title={"Email"}
                        placeholder={"Nhập email"}
                        onchange={(value) => setEmailNhanVien(value)}
                    />
                    <ItemDatePicker
                        date={dateNgayVaoLam}
                        title={"Ngày vào làm"}
                        placeholder={"dd/MM/YYYY"}
                        onDateChange={(date) => setNgayVaoLam(date)}
                    />
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <ItemInput
                            value={loainhanvien}
                            readOnly={false}
                            dropdown={true}
                            onPress={() => {
                                refRBSheetLoaiNV.current.open();
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
                    ref={refRBSheetTinhTP}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <Item_Bottomsheet
                        onPress={() => refRBSheetTinhTP.current.close()}
                        title={title}
                        key={keyBottom}
                        data={dataTinhThanhPho}
                        getfunction={getQuanHuyen}
                    />
                </RBSheet>
                {/* bottom view */}
                <RBSheet
                    height={size.height * 0.5}
                    ref={refRBSheetQH}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <Item_Bottomsheet
                        onPress={() => refRBSheetQH.current.close()}
                        title={title}
                        key={keyBottom}
                        data={dataQuanHuyen}
                        getfunction={getPhuongXa}
                    />
                </RBSheet>
                {/* bottom view */}
                <RBSheet
                    height={size.height * 0.5}
                    ref={refRBSheetPX}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <Item_Bottomsheet
                        onPress={() => refRBSheetPX.current.close()}
                        title={title}
                        key={keyBottom}
                        data={dataPhuongXa}
                        getfunction={setNamePhuongXa}
                    />
                </RBSheet>

                {/* bottom view */}
                <RBSheet
                    height={size.height * 0.5}
                    ref={refRBSheetLoaiNV}
                    closeOnDragDown={false}
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    closeOnPressMask={false}>
                    <BottomSheetLoaiNV
                        onPress={() => refRBSheetLoaiNV.current.close()}
                        title={title}
                        key={keyBottom}
                        data={dataloainv}
                        getfunction={setNameLoaiNhanVien}
                    />
                </RBSheet>
                {/* bottom view */}
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
    },
    view_loading: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
});