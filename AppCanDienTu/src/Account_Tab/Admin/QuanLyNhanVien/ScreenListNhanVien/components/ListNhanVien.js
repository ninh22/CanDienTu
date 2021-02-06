import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { View, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import ItemNhanVien from './Item_NhanVien';
import host from '../../../../../Server/host';

import {
    getNhanVienAction,
    loadmoreNhanVienAction
} from '../../../../../Redux/index';
const size = Dimensions.get("screen");
function ListNhanVien() {
    const [pagenumber, setPageNumber] = useState(1);
    const [numberlimit, setNumberLimit] = useState(10);
    const [visibleLoadMore, setvisibleLoadMore] = useState(false);
    const dispatch = useDispatch();
    let DATA_NHANVIEN = useSelector((state) => state.nhanvienReducer);
    const getNhanVien = (item) => dispatch(getNhanVienAction(item));
    const loadNhanVienAction = (item) => dispatch(loadmoreNhanVienAction(item));
    useEffect(() => {
        getListNhanVien();
    }, []);
   

    const getListNhanVien = async () => {
        return fetch(host.getAllNhanVien, {
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

                        if (DATA_NHANVIEN.length==0) {
                            getNhanVien(responseJson.data);
                        } else {
                            loadNhanVienAction(responseJson.data);
                        }
                        setvisibleLoadMore(false);
                        break;
                    case 'full':
                        if (DATA_NHANVIEN.length==0) {
                            getNhanVien(responseJson.data);
                        } else {
                            loadNhanVienAction(responseJson.data);
                        }

                        setvisibleLoadMore(false);
                        break;
                    case 'maxfull':
                        setvisibleLoadMore(false);
                        break;
                    default:
                        setvisibleLoadMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });



    }
    function handleLoadMore() {
        setPageNumber(parseInt(pagenumber + 1));
        getListNhanVien();
        setvisibleLoadMore(true);
    }
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA_NHANVIEN}
                renderItem={item => {
                    return (
                        <ItemNhanVien item={item}></ItemNhanVien>
                    )
                }}

                keyExtractor={(item, index) => item.id_NV}

                onEndReached={() => handleLoadMore()}
                onEndReachedThreshold={1}
                ListFooterComponent={
                    <View style={{ padding: '1%' }}>
                        {visibleLoadMore ? (
                            <View
                                style={{
                                    width: '100%',
                                    height: 40,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    source={require('../../../../../Images/loading/Spin-1s-200px.gif')}
                                />
                            </View>
                        ) : null}
                    </View>

                }
            />
        </View>
    );
}
export default ListNhanVien;
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 10,
    },

});