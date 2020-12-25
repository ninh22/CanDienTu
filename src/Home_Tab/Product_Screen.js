/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Response_Size from '../ScriptFile/ResponsiveSize_Script';
import Loading_Screen from '../ScriptFile/Loading_Screen';
import ScalableText from 'react-native-text';
import HeaderCustom from '../Components/Header_Custom';
import CallButton from '../Components/CallButton';

const Components = ({ navigationComponents, dataRoute }) => {

  var DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cân xe tải',
      TypeID: "1",
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candientuquochung3.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      TypeID: "2",
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbantan.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc2',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/Indicator.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd2',
      title: 'Cân động vật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/can-dong-vat-candientuquochung-300x300.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },

    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba76',
      title: 'Cân xe tải',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cankythuat-qhs-kd192.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb34',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantreo.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc23',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd14',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "4",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantudong.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc27',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/CANBANGTAI.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd235',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/quochung12mc-3.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
  ];
  const LuuDATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cân xe tải',
      TypeID: "1",
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candientuquochung3.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      TypeID: "2",
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbantan.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc2',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/Indicator.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd2',
      title: 'Cân động vật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/can-dong-vat-candientuquochung-300x300.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },

    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba76',
      title: 'Cân xe tải',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cankythuat-qhs-kd192.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb34',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantreo.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc23',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd14',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "4",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantudong.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc27',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/CANBANGTAI.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd235',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/quochung12mc-3.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },{
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cân xe tải',
      TypeID: "1",
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candientuquochung3.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/candongho-qhs.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      money: '65,000',
      TypeID: "2",
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbantan.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc2',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/Indicator.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd2',
      title: 'Cân động vật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/can-dong-vat-candientuquochung-300x300.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },

    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba76',
      title: 'Cân xe tải',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cankythuat-qhs-kd192.gif',
      subtitle: 'Đa dạng về kích thước và tải trọng được thiết kế rất cứng cáp, hoạt động tốt trong môi trường công nghiệp.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb34',
      title: 'Cân đồng hồ điện tử',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantreo.gif',
      subtitle: 'Cân bàn kiểu cân đồng hồ có nhiều kích thước, công suất và độ hoàn thiện để phù hợp với môi trường làm việc của bạn.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc23',
      title:
        'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "3",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/canbannho.gif',
      subtitle: 'Thiết kế mạnh mẽ, chắc chắn, có nhiều kích thước và tải trọng phù hợp với nhu cầu sử dụng của khách hàng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd14',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "4",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2020/09/cantudong.gif',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc27',
      title: 'Cân bàn nhỏ',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/04/CANBANGTAI.jpg',
      subtitle: 'Mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và công suất phù hợp với mọi ứng dụng trong các nhà máy.',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd235',
      title: 'Cân sàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "5",
      money: '65,000',
      img:
        'https://candientuquochung.com/wp-content/uploads/2019/03/quochung12mc-3.jpg',
      subtitle: 'Thiết kế mạnh mẽ, chính xác và được chế tạo bền bỉ, những chiếc cân sàn này có nhiều kích cỡ và tải trọng.',
    },
  ];
  const DATA_TYPE = [
    {
      id: 'All',
      title: 'Tất cả',
    },
    {
      id: '0',
      title: 'Cân xe tải',
    },
    {
      id: '1',
      title: 'Cân nông sản',
    },
    {
      id: '2',
      title: 'Cân bàn',
    },
    {
      id: '3',
      title: 'Cân sàn',
    },
    {
      id: '4',
      title: 'Cân kỹ thuật',
    },
    {
      id: '5',
      title: 'Cân phân tích',
    },
    {
      id: '6',
      title: 'Cân chuyên dùng',
    },
    {
      id: '7',
      title: 'Cân treo - Cân móc cẩu',
    },
    {
      id: '8',
      title: 'Cân tự động',
    },
    {
      id: '9',
      title: 'Thiết bị và phụ kiện',
    },
    {
      id: '10',
      title: 'Dụng cụ nông sản',
    },
  ];
  const DATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dịch vụ sửa cân ô tô',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Thay thế loadcell cân ô tô Gia Lai Cân điện tử Quốc Hưng, với đội ngủ kỹ thuật có nhiều năm kinh nghiệm trong lĩnh vực cân điện tử, ',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Dịch vụ sửa cân bàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Cân điện tử Quốc Hưng Chúng tôi chuyên cung cấp các loại cân điện tử dành cho các đại lý thu mua kén tự do tại khu vực Lâm Hà, Đam Rông, Đức Trọng, Di Linh, Bảo Lộc…',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Dịch vụ sửa cân kỹ thuật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Sửa chữa cân điện tử Đăk Lăk và các tỉnh tại khu vực Tây Nguyên Cân điện tử Quốc Hưng nhận sửa chữa bảo trì các loại cân điện tử tại khu vực Đăk Lăk Sửa chữa cân bàn điện tử',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Dịch vụ sửa cân treo',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Sửa chữa cân điện tử Đăk Lăk và các tỉnh tại khu vực Tây Nguyên Cân điện tử Quốc Hưng nhận sửa chữa bảo trì các loại cân điện tử tại khu vực Đăk Lăk Sửa chữa cân bàn điện tử',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Dịch vụ sửa cân kỹ thuật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Dịch vụ sửa chữa cân điện tử Đăk Nông, chúng tôi nhận sửa chữa các loại cân điện tử, hổ trợ kiểm định, ',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Dịch vụ sửa cân treo',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Cân điện tử làm tạp mủ cao su Cân KD-Tbed – thuộc dòng cân tiểu ly làm tạp nông sản  Cân điện tử làm tạp mủ cao su với độ chính xác cao đến 0.01g. Có thể cân được cả Vàng, Kim Cương Với kích thước nhỏ gọn và nguồn năng lượng mạnh mẽ của',
    },
  ];
  const LuuDATA2 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Dịch vụ sửa cân ô tô',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Thay thế loadcell cân ô tô Gia Lai Cân điện tử Quốc Hưng, với đội ngủ kỹ thuật có nhiều năm kinh nghiệm trong lĩnh vực cân điện tử, ',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      title: 'Dịch vụ sửa cân bàn',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Cân điện tử Quốc Hưng Chúng tôi chuyên cung cấp các loại cân điện tử dành cho các đại lý thu mua kén tự do tại khu vực Lâm Hà, Đam Rông, Đức Trọng, Di Linh, Bảo Lộc…',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Dịch vụ sửa cân kỹ thuật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "1",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Sửa chữa cân điện tử Đăk Lăk và các tỉnh tại khu vực Tây Nguyên Cân điện tử Quốc Hưng nhận sửa chữa bảo trì các loại cân điện tử tại khu vực Đăk Lăk Sửa chữa cân bàn điện tử',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Dịch vụ sửa cân treo',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Sửa chữa cân điện tử Đăk Lăk và các tỉnh tại khu vực Tây Nguyên Cân điện tử Quốc Hưng nhận sửa chữa bảo trì các loại cân điện tử tại khu vực Đăk Lăk Sửa chữa cân bàn điện tử',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      title: 'Dịch vụ sửa cân kỹ thuật',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Dịch vụ sửa chữa cân điện tử Đăk Nông, chúng tôi nhận sửa chữa các loại cân điện tử, hổ trợ kiểm định, ',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bd',
      title: 'Dịch vụ sửa cân treo',
      seri_car: '92C-04610',
      stuff: 'Xi măng',
      TypeID: "2",
      money: '65,000',
      img: 'https://candientuquochung.com/wp-content/uploads/2020/04/pm.jpg',
      subtitle: 'Cân điện tử làm tạp mủ cao su Cân KD-Tbed – thuộc dòng cân tiểu ly làm tạp nông sản  Cân điện tử làm tạp mủ cao su với độ chính xác cao đến 0.01g. Có thể cân được cả Vàng, Kim Cương Với kích thước nhỏ gọn và nguồn năng lượng mạnh mẽ của',
    },
  ];
  const DATA2_TYPE = [
    {
      id: 'All',
      title: 'Tất cả',
    },
    {
      id: '0',
      title: 'Sửa chữa cân xe tải',
    },
    {
      id: '1',
      title: 'Sửa chữa cân bàn điện tử',
    },
    {
      id: '2',
      title: 'Sửa cân kỹ thuật',
    },
    {
      id: '3',
      title: 'Sửa cân treo',
    },
    {
      id: '4',
      title: 'Dịch vụ hiệu chuẩn - Kiểm định cân điện tử',
    },
    {
      id: '5',
      title: 'Dịch vụ tháo dỡ cân xe tải',
    },
    {
      id: '6',
      title: 'Dịch vụ vận chuyển di dời trạm cân xe tải',
    },
  ];

  const [search, setSearch] = useState('');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.view_item}
      onPress={() => {
        navigationComponents.navigate(
          'productdetail',
        );
      }}>
      <View style={styles.item_view_img}>
        <Image resizeMode={"cover"} source={{ uri: item.img }} style={styles.item_img} />
      </View>
      <View style={styles.item_view_title}>
        <ScalableText style={styles.item_title} numberOfLines={2}>
          {item.title}
        </ScalableText>
        <Text style={{ marginBottom: 2 }}>Liên hệ: 02623 821 888</Text>
      </View>

      <View style={styles.item_view_titleSub}>
        <Text style={{ marginBottom: 2 }}>Mô tả:</Text>
        <ScalableText style={styles.item_titleSub} numberOfLines={4}>
          {item.subtitle}
        </ScalableText>
      </View>
    </TouchableOpacity>
  );

  const [keySelected, setKeySelected] = useState("All");
  const [testData, setTestData] = useState(DATA);
  const [testDataService, setTestDataService] = useState(DATA2);
  const setKey_Selected = (id) => {
    setKeySelected(id)
    if(dataRoute=='SẢN PHẨM'){
      if (id == "All") {
        setTestData(LuuDATA)
      } else {
        var data = [];
        for (var i = 0; i < DATA.length; i++) {
          if (DATA[i].TypeID == id) {
            data.push(DATA[i])
          }
        }
        setTestData(data)
      }
    }else if (dataRoute=='DỊCH VỤ'){
      if (id == "All") {
        setTestDataService(LuuDATA2)
      } else {
        var data = [];
        for (var i = 0; i < DATA2.length; i++) {
          if (DATA2[i].TypeID == id) {
            data.push(DATA2[i])
          }
        }
        setTestDataService(data)
      }
    }
    
  }
  const renderItem_Type = ({ item }) => (
    <Button
      buttonStyle={[styles.btn, { backgroundColor: keySelected == item.id ? "green" : null }]}
      titleStyle={{ color: keySelected == item.id ? "white" : "green" }}
      type="outline"
      title={item.title}
      onPress={() => {
        setKey_Selected(item.id)
      }}
    >

    </Button>
  );

  const checkData = (key) => {
    if (key == 'SẢN PHẨM') {
      return testData;
    } else if (key == 'DỊCH VỤ') {
      return testDataService;
    }
  };

  const checkData_Type = (key) => {
    if (key == 'SẢN PHẨM') {
      return DATA_TYPE;
    } else if (key == 'DỊCH VỤ') {
      return DATA2_TYPE;
    }
  };

  return (
    <View style={styles.parent}>
      <HeaderCustom
        navigationHeader={navigationComponents}
        title={dataRoute}
        visibleSearch={true}
        searchPlaceHolder="Tìm tên sản phẩm"
        value={search}
        onChangeText={setSearch}
      />
      <View
        style={{
          height: Response_Size('hg', 0, 7),
          marginVertical: '1%',
        }}>
        <FlatList
          data={checkData_Type(dataRoute)}
          renderItem={renderItem_Type}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ width: '100%', height: '100%', paddingHorizontal: 2, flex: 1,backgroundColor:"white" }}>
        {testData.length == 0 || testDataService.length==0?
         <View style={{ width: '100%', height: '100%', paddingHorizontal: 2, flex: 1,backgroundColor:"white",justifyContent:"center",alignItems:"center" }}>
          {/* <Image resizeMode={"cover"} source={require('../Images/imgnulldata.png')} style={{height:200,width:200,}} /> */}
            {dataRoute=='SẢN PHẨM'?<Text>Không có sản phẩm</Text>:<Text>Không có dịch vụ</Text>}
          </View>
          :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={checkData(dataRoute)}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
            keyExtractor={(item) => item.id}
          />}
      </View>
      <CallButton />
    </View>
  );
};

const Product_Screen = ({ navigation, route }) => {
  const [keyProduct, setKeyProduct] = useState(route.params.product);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 500);
  });
  return (
    <Loading_Screen
      edgesTop={false}
      visible={visible}
      code={
        <Components navigationComponents={navigation} dataRoute={keyProduct} />
      }
    />
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
  view_item: {

    flex: 1,
    height: Response_Size('hg', 1, 40, 100),
    marginBottom: '3%',
    borderRadius: 5,
    marginHorizontal: 2,
    borderColor: '#C9CFD3',
    borderWidth: 1,
    elevation: 2,
    backgroundColor: 'white',
  },
  // view_item: {
  //   width: '100%', //49%
  //   height: Response_Size('hg', 1, 71, 100),
  //   marginBottom: '3%',
  //   borderRadius: 10,
  //   borderColor: '#C9CFD3',
  //   borderWidth: 1,
  //   elevation: 5,
  //   backgroundColor: 'white',
  // },
  item_view_img: {
    height: 170,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  item_img: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  item_view_title: {
    padding: 5
  },
  item_view_titleSub: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5,
  },
  item_title: {
    color: '#309045',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item_titleSub: {
    fontSize: 17,
    // textAlign: 'center',
  },
  btn: {
    backgroundColor: 'white',
    borderColor: '#309045',
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default Product_Screen;
