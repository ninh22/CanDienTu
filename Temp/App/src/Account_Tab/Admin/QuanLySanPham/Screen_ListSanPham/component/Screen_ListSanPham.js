import React from 'react';
import { View,Dimensions,StyleSheet,FlatList } from 'react-native';
import ItemSanPham from './Item_SanPham';
const size =Dimensions.get('window');
const DATA_SANPHAM = [
   {id_SP:1,ten_SP:"Sản phẩm 1",hinhanh_SP:"https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif",kichthuoc_SP:'không biết',muccan_SP:'k',phandocan_SP:'k',dongia_SP:'k',mota_SP:'k',id_loaiSP:'k'},
   {id_SP:2,ten_SP:"Sản phẩm 2",hinhanh_SP:"https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif",kichthuoc_SP:'không biết',muccan_SP:'k',phandocan_SP:'k',dongia_SP:'k',mota_SP:'k',id_loaiSP:'k'},
   {id_SP:3,ten_SP:"Sản phẩm 3",hinhanh_SP:"https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif",kichthuoc_SP:'không biết',muccan_SP:'k',phandocan_SP:'k',dongia_SP:'k',mota_SP:'k',id_loaiSP:'k'},
];
function ListSanPham({navigation}){
    return(
        <View style={styles.container}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA_SANPHAM}
                renderItem={item => {
                    return (
                       <ItemSanPham item={item}/>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    );
}
export default ListSanPham;
const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:10,
    }
});