-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th1 03, 2021 lúc 12:05 AM
-- Phiên bản máy phục vụ: 10.3.24-MariaDB-log
-- Phiên bản PHP: 7.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `can15657_canquochung`
--

DELIMITER $$
--
-- Thủ tục
--
CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `CreateUserPer` (IN `IdUser` INT(11))  BEGIN
	declare nameMenu varchar(45);
	DECLARE curMenu CURSOR FOR Select name from tbmenu;
	open curMenu;
	loop
		fetch curMenu into nameMenu;
        if !exists(select userid from tbusers_permisson where menuid = nameMenu) then 
			INSERT INTO tbusers_permisson 
				(userid,menuid,ExecuteShow,ExecuteAdd,ExecuteUpdate,ExecuteDelete)
			 VALUES
				(IdUser,nameMenu,0,0,0,0);
		end if;
	end loop;
	close curMenu;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tapchat_tt` (`act` VARCHAR(10), `phantram` DECIMAL(11,2), `trubi` DECIMAL(11), `idweight` INT(11), `idgroups` INT(11))  BEGIN
	if (act = 'update') THEN
		Update tbweight set value1=phantram,value2=trubi,value3=net_weight-trubi where id = idweight;
    end if;
    if (act = 'list') then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram,value2 as trubi,value3 as tltt,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
        from tbweight where idusergroup = idgroups;
    end if;
    if (act = 'phieucan') then
		SELECT 
        `tbweight`.`id` AS `id`,
        `tbweight`.`formcode` AS `formcode`,
        `tbweight`.`truct_no` AS `truct_no`,
        `tbweight`.`notes` AS `notes`,
        `tbweight`.`date_in` AS `date_in`,
        `tbweight`.`date_out` AS `date_out`,
        `tbweight`.`weight_1` AS `weight_1`,
        `tbweight`.`weight_2` AS `weight_2`,
        `tbweight`.`net_weight` AS `net_weight`,
        `tbweight`.`customer_name` AS `customer_name`,
        `tbweight`.`items_name` AS `items_name`,
        `tbweight`.`weight_type` AS `weight_type`,
        `tbweight_type`.`name` AS `kieucan`,
        CAST(`tbweight`.`date_out`
            AS DATE) AS `gngay`,
        `tbweight`.`price` AS `price`,
        `tbweight`.`price_total` AS `price_total`,
		`tbweight`.`value1` AS `phantram`,
        `tbweight`.`value2` AS `trubi`,
        `tbweight`.`value3` AS `tltt`
		FROM
        (`tbweight`
        JOIN `tbweight_type` ON (`tbweight`.`weight_type` = `tbweight_type`.`id`)) 
		Where `tbweight`.`id` = idweight
		ORDER BY CAST(`tbweight`.`date_out`
        AS DATE);
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tapchat_tt_report` (`truct_no` VARCHAR(20), `pitem_name` NVARCHAR(50), `pcustomer_name` NVARCHAR(50), `date_from` DATETIME, `date_to` DATETIME, `idgroups` INT, `weighttype` VARCHAR(10))  BEGIN
	select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram,value2 as trubi,value3 as tltt,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
	from tbweight 
    where idusergroup = idgroups and date_in between date_from and date_to 
    AND customer_name = (case when pcustomer_name <> "" then pcustomer_name else customer_name end)
    AND items_name = (case when pitem_name <> "" then pitem_name else items_name end);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbcustomer`
--

CREATE TABLE `tbcustomer` (
  `idcustomer` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phonenumber` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `websites` text DEFAULT NULL,
  `idusergroup` int(11) NOT NULL,
  `enable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbcustomer`
--

INSERT INTO `tbcustomer` (`idcustomer`, `name`, `phonenumber`, `address`, `websites`, `idusergroup`, `enable`) VALUES
('kh1', 'Khách hàng 12', NULL, NULL, NULL, 1, b'1'),
('kh2', 'khsds', NULL, NULL, NULL, 1, b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbitems`
--

CREATE TABLE `tbitems` (
  `iditems` varchar(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `idusergroup` int(11) NOT NULL,
  `enable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbitems`
--

INSERT INTO `tbitems` (`iditems`, `name`, `idusergroup`, `enable`) VALUES
('caphetuoi', 'Cà phê tươi', 1, b'1'),
('cui', 'Cũi', 1, b'0'),
('da', 'Đá', 1, b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbmenu`
--

CREATE TABLE `tbmenu` (
  `name` varchar(45) NOT NULL,
  `displayname` varchar(255) NOT NULL,
  `enable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbmenu`
--

INSERT INTO `tbmenu` (`name`, `displayname`, `enable`) VALUES
('frmBackup', 'Sao lưu dữ liệu', b'1'),
('frmCan', 'Cân xe', b'1'),
('frmChangePass', 'Đổi mật khẩu', b'1'),
('frmConfigPrints', 'Cài đặt máy in', b'1'),
('frmConfigs', 'Cài đặt', b'1'),
('frmCustomer', 'Khách hàng', b'1'),
('frmDSCan', 'Cân đã lưu', b'1'),
('frmItems', 'Hàng hóa', b'1'),
('frmReportListWeight', 'Báo cáo', b'1'),
('frmSqlTool', 'Sql tool', b'1'),
('frmSupport', 'Hỗ trợ', b'1'),
('frmUsers', 'Quản lý user', b'1'),
('frmUsersPer', 'Phân quyền', b'1'),
('frmWeightControl', 'Thiết bị cân', b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbsettings`
--

CREATE TABLE `tbsettings` (
  `name` varchar(20) NOT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbsettings`
--

INSERT INTO `tbsettings` (`name`, `value`) VALUES
('address', '78, Đường 10/3, P.Tân Lợi, Tp. Buôn Ma Thuột, T.ĐăkLăk'),
('company', 'Công Ty Cân Điện Tử Quốc Hưng'),
('ctl_weight_id', '1'),
('email', 'info@candientuquochung.com'),
('phonenumber', '0262 3821 888'),
('portname', 'COM1'),
('websites', 'www.candientuquochung.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers`
--

CREATE TABLE `tbusers` (
  `id` int(11) NOT NULL,
  `username` varchar(10) NOT NULL,
  `password` varchar(50) NOT NULL,
  `idusergroup` int(11) NOT NULL,
  `iduserrole` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers`
--

INSERT INTO `tbusers` (`id`, `username`, `password`, `idusergroup`, `iduserrole`) VALUES
(1, 'admin', '38766B1B0A1EE20DA96609A84C58727F', 1, 1),
(2, 'admin12', '1d339d30db898a06ec0afa7025418658', 1, 1),
(3, 'admin1', '1d339d30db898a06ec0afa7025418658', 0, 1),
(17, 'caphe706', '7E1801739DD9867835F666182B9E1B75', 3, 2),
(100, 'caphe', 'bd29e9e3abc078b85ef6116f1e681d3d', 3, 1),
(101, 'caphe89', '27b3823997fcc2167e34674073304298', 3, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers_group`
--

CREATE TABLE `tbusers_group` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phonenumber` varchar(255) NOT NULL,
  `lastid` int(11) NOT NULL,
  `startdate` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `sign_1` varchar(20) DEFAULT NULL,
  `sign_2` varchar(20) DEFAULT NULL,
  `sign_3` varchar(20) DEFAULT NULL,
  `sign_4` varchar(20) DEFAULT NULL,
  `idweight_apptype` int(1) NOT NULL,
  `enable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_group`
--

INSERT INTO `tbusers_group` (`id`, `name`, `address`, `phonenumber`, `lastid`, `startdate`, `enddate`, `sign_1`, `sign_2`, `sign_3`, `sign_4`, `idweight_apptype`, `enable`) VALUES
(1, 'Cân điện tử Quốc Hưng', '78, Đường 10/3, Phường Tân Lợi, TP Buôn Ma Thuột', '09819 12347', 13, NULL, NULL, NULL, NULL, NULL, NULL, 1, b'1'),
(3, 'Cà phê 706', 'Gia Lai', '097893332', 6, NULL, NULL, NULL, NULL, NULL, 'Người cân', 2, b'1'),
(30, '123', '123', '0946249525', 1, NULL, '2021-01-02 23:59:59', NULL, NULL, NULL, NULL, 1, b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers_permisson`
--

CREATE TABLE `tbusers_permisson` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `menuid` varchar(45) NOT NULL,
  `ExecuteShow` bit(1) NOT NULL,
  `ExecuteAdd` bit(1) NOT NULL,
  `ExecuteUpdate` bit(1) NOT NULL,
  `ExecuteDelete` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_permisson`
--

INSERT INTO `tbusers_permisson` (`id`, `userid`, `menuid`, `ExecuteShow`, `ExecuteAdd`, `ExecuteUpdate`, `ExecuteDelete`) VALUES
(1, 1, 'frmBackup', b'1', b'1', b'1', b'1'),
(2, 1, 'frmCan', b'1', b'1', b'1', b'1'),
(3, 1, 'frmChangePass', b'1', b'1', b'1', b'1'),
(4, 1, 'frmConfigs', b'1', b'1', b'1', b'1'),
(5, 1, 'frmCustomer', b'1', b'1', b'1', b'1'),
(6, 1, 'frmDSCan', b'1', b'1', b'1', b'1'),
(7, 1, 'frmItems', b'1', b'1', b'1', b'1'),
(8, 1, 'frmReportListWeight', b'1', b'1', b'1', b'1'),
(9, 1, 'frmSqlTool', b'1', b'1', b'1', b'1'),
(10, 1, 'frmSupport', b'1', b'1', b'1', b'1'),
(11, 1, 'frmUsers', b'1', b'1', b'1', b'1'),
(12, 1, 'frmUsersPer', b'1', b'1', b'1', b'1'),
(13, 1, 'frmWeightControl', b'1', b'1', b'1', b'1'),
(14, 17, 'frmBackup', b'1', b'0', b'0', b'0'),
(15, 17, 'frmCan', b'1', b'1', b'1', b'1'),
(16, 17, 'frmChangePass', b'1', b'0', b'0', b'0'),
(17, 17, 'frmConfigs', b'1', b'0', b'0', b'0'),
(18, 17, 'frmCustomer', b'1', b'1', b'1', b'1'),
(19, 17, 'frmDSCan', b'1', b'1', b'1', b'1'),
(20, 17, 'frmItems', b'1', b'1', b'1', b'1'),
(21, 17, 'frmReportListWeight', b'1', b'0', b'0', b'0'),
(22, 17, 'frmSqlTool', b'1', b'0', b'0', b'0'),
(23, 17, 'frmSupport', b'1', b'0', b'0', b'0'),
(24, 17, 'frmUsers', b'0', b'0', b'0', b'0'),
(25, 17, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(26, 17, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(27, 5, 'frmBackup', b'0', b'0', b'0', b'0'),
(28, 5, 'frmCan', b'0', b'0', b'0', b'0'),
(29, 5, 'frmChangePass', b'0', b'0', b'0', b'0'),
(30, 5, 'frmConfigs', b'0', b'0', b'0', b'0'),
(31, 5, 'frmCustomer', b'0', b'0', b'0', b'0'),
(32, 5, 'frmDSCan', b'0', b'0', b'0', b'0'),
(33, 5, 'frmItems', b'0', b'0', b'0', b'0'),
(34, 5, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(35, 5, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(36, 5, 'frmSupport', b'0', b'0', b'0', b'0'),
(37, 5, 'frmUsers', b'0', b'0', b'0', b'0'),
(38, 5, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(39, 5, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(53, 34, 'frmBackup', b'0', b'0', b'0', b'0'),
(54, 34, 'frmCan', b'0', b'0', b'0', b'0'),
(55, 34, 'frmChangePass', b'0', b'0', b'0', b'0'),
(56, 34, 'frmConfigs', b'0', b'0', b'0', b'0'),
(57, 34, 'frmCustomer', b'0', b'0', b'0', b'0'),
(58, 34, 'frmDSCan', b'0', b'0', b'0', b'0'),
(59, 34, 'frmItems', b'0', b'0', b'0', b'0'),
(60, 34, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(61, 34, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(62, 34, 'frmSupport', b'0', b'0', b'0', b'0'),
(63, 34, 'frmUsers', b'0', b'0', b'0', b'0'),
(64, 34, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(65, 34, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(79, 2, 'frmBackup', b'0', b'0', b'0', b'0'),
(80, 2, 'frmCan', b'0', b'0', b'0', b'0'),
(81, 2, 'frmChangePass', b'0', b'0', b'0', b'0'),
(82, 2, 'frmConfigs', b'0', b'0', b'0', b'0'),
(83, 2, 'frmCustomer', b'0', b'0', b'0', b'0'),
(84, 2, 'frmDSCan', b'0', b'0', b'0', b'0'),
(85, 2, 'frmItems', b'0', b'0', b'0', b'0'),
(86, 2, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(87, 2, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(88, 2, 'frmSupport', b'0', b'0', b'0', b'0'),
(89, 2, 'frmUsers', b'0', b'0', b'0', b'0'),
(90, 2, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(91, 2, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(92, 3, 'frmBackup', b'0', b'0', b'0', b'0'),
(93, 3, 'frmCan', b'0', b'0', b'0', b'0'),
(94, 3, 'frmChangePass', b'0', b'0', b'0', b'0'),
(95, 3, 'frmConfigs', b'0', b'0', b'0', b'0'),
(96, 3, 'frmCustomer', b'0', b'0', b'0', b'0'),
(97, 3, 'frmDSCan', b'0', b'0', b'0', b'0'),
(98, 3, 'frmItems', b'0', b'0', b'0', b'0'),
(99, 3, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(100, 3, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(101, 3, 'frmSupport', b'0', b'0', b'0', b'0'),
(102, 3, 'frmUsers', b'0', b'0', b'0', b'0'),
(103, 3, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(104, 3, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(105, 10, 'frmBackup', b'0', b'0', b'0', b'0'),
(106, 10, 'frmCan', b'0', b'0', b'0', b'0'),
(107, 10, 'frmChangePass', b'0', b'0', b'0', b'0'),
(108, 10, 'frmConfigs', b'0', b'0', b'0', b'0'),
(109, 10, 'frmCustomer', b'0', b'0', b'0', b'0'),
(110, 10, 'frmDSCan', b'0', b'0', b'0', b'0'),
(111, 10, 'frmItems', b'0', b'0', b'0', b'0'),
(112, 10, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(113, 10, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(114, 10, 'frmSupport', b'0', b'0', b'0', b'0'),
(115, 10, 'frmUsers', b'0', b'0', b'0', b'0'),
(116, 10, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(117, 10, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(118, 50, 'frmBackup', b'0', b'0', b'0', b'0'),
(119, 50, 'frmCan', b'0', b'0', b'0', b'0'),
(120, 50, 'frmChangePass', b'0', b'0', b'0', b'0'),
(121, 50, 'frmConfigs', b'0', b'0', b'0', b'0'),
(122, 50, 'frmCustomer', b'0', b'0', b'0', b'0'),
(123, 50, 'frmDSCan', b'0', b'0', b'0', b'0'),
(124, 50, 'frmItems', b'0', b'0', b'0', b'0'),
(125, 50, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(126, 50, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(127, 50, 'frmSupport', b'0', b'0', b'0', b'0'),
(128, 50, 'frmUsers', b'0', b'0', b'0', b'0'),
(129, 50, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(130, 50, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(144, 100, 'frmBackup', b'0', b'0', b'0', b'0'),
(145, 100, 'frmCan', b'0', b'0', b'0', b'0'),
(146, 100, 'frmChangePass', b'0', b'0', b'0', b'0'),
(147, 100, 'frmConfigs', b'0', b'0', b'0', b'0'),
(148, 100, 'frmCustomer', b'0', b'0', b'0', b'0'),
(149, 100, 'frmDSCan', b'0', b'0', b'0', b'0'),
(150, 100, 'frmItems', b'0', b'0', b'0', b'0'),
(151, 100, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(152, 100, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(153, 100, 'frmSupport', b'0', b'0', b'0', b'0'),
(154, 100, 'frmUsers', b'0', b'0', b'0', b'0'),
(155, 100, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(156, 100, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(157, 24, 'frmBackup', b'0', b'0', b'0', b'0'),
(158, 24, 'frmCan', b'0', b'0', b'0', b'0'),
(159, 24, 'frmChangePass', b'0', b'0', b'0', b'0'),
(160, 24, 'frmConfigs', b'0', b'0', b'0', b'0'),
(161, 24, 'frmCustomer', b'0', b'0', b'0', b'0'),
(162, 24, 'frmDSCan', b'0', b'0', b'0', b'0'),
(163, 24, 'frmItems', b'0', b'0', b'0', b'0'),
(164, 24, 'frmReportListWeight', b'0', b'0', b'0', b'0'),
(165, 24, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(166, 24, 'frmSupport', b'0', b'0', b'0', b'0'),
(167, 24, 'frmUsers', b'0', b'0', b'0', b'0'),
(168, 24, 'frmUsersPer', b'0', b'0', b'0', b'0'),
(169, 24, 'frmWeightControl', b'0', b'0', b'0', b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers_role`
--

CREATE TABLE `tbusers_role` (
  `idtbusers_role` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_role`
--

INSERT INTO `tbusers_role` (`idtbusers_role`, `name`) VALUES
(1, 'Admin'),
(2, 'Quản lý'),
(3, 'Trạm cân');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight`
--

CREATE TABLE `tbweight` (
  `id` int(11) NOT NULL,
  `formcode` varchar(10) NOT NULL,
  `weight_type` varchar(10) DEFAULT NULL,
  `items_id` varchar(10) DEFAULT NULL,
  `items_name` varchar(50) DEFAULT NULL,
  `customer_id` varchar(10) DEFAULT NULL,
  `customer_name` varchar(50) DEFAULT NULL,
  `truct_no` varchar(10) NOT NULL,
  `notes` varchar(100) DEFAULT NULL,
  `date_in` datetime NOT NULL,
  `date_out` datetime DEFAULT NULL,
  `weight_1` decimal(11,2) NOT NULL,
  `weight_2` decimal(11,2) DEFAULT NULL,
  `net_weight` decimal(11,2) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `price_total` int(11) DEFAULT NULL,
  `createby` int(11) NOT NULL,
  `createtime` datetime NOT NULL,
  `modifiredby` int(11) DEFAULT NULL,
  `modifiredtime` datetime DEFAULT NULL,
  `value1` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value2` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value3` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value4` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value5` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value6` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value7` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value8` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value9` decimal(11,2) NOT NULL DEFAULT 0.00,
  `value10` decimal(11,2) NOT NULL DEFAULT 0.00,
  `idusergroup` int(11) NOT NULL,
  `enable` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight`
--

INSERT INTO `tbweight` (`id`, `formcode`, `weight_type`, `items_id`, `items_name`, `customer_id`, `customer_name`, `truct_no`, `notes`, `date_in`, `date_out`, `weight_1`, `weight_2`, `net_weight`, `price`, `price_total`, `createby`, `createtime`, `modifiredby`, `modifiredtime`, `value1`, `value2`, `value3`, `value4`, `value5`, `value6`, `value7`, `value8`, `value9`, `value10`, `idusergroup`, `enable`) VALUES
(1, '5', 'nh', NULL, 'hang', NULL, 'khach', '11', '', '2020-12-21 10:13:44', '2020-12-21 16:44:02', '11111.00', '120.00', '10991.00', 0, 0, 1, '2020-12-21 10:13:47', 1, '2020-12-21 16:44:05', '1.00', '122.00', '10869.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1'),
(2, '6', 'nh', NULL, NULL, NULL, '', '11', '', '2020-12-22 14:40:46', '2020-12-22 14:42:31', '12350.00', '100.00', '12250.00', 100, 1187000, 1, '2020-12-22 14:40:50', 1, '2020-12-22 16:58:33', '3.10', '380.00', '11870.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1'),
(3, '7', 'xh', NULL, NULL, NULL, '', '100', '', '2020-12-23 07:54:56', '2020-12-23 07:56:30', '10250.00', '20000.00', '9750.00', 0, 0, 1, '2020-12-23 07:55:03', 1, '2020-12-23 07:56:41', '1.20', '117.00', '9633.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1'),
(22, '5', 'nh', NULL, 'go', NULL, 'khach', '11', '', '2020-12-26 10:13:44', '2020-01-21 16:44:02', '11111.00', '120.00', '10991.00', 0, 100000, 1, '2020-12-21 10:13:47', 1, '2020-12-21 16:44:05', '1.00', '122.00', '10869.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(23, '6', 'nh', NULL, NULL, NULL, '', '11', '', '2020-12-25 14:40:46', '2020-02-22 14:42:31', '12350.00', '100.00', '12250.00', 100, 200000, 1, '2020-12-22 14:40:50', 1, '2020-12-22 16:58:33', '3.10', '380.00', '11870.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(24, '7', 'xh', NULL, NULL, NULL, '', '100', '', '2020-12-24 07:54:56', '2020-03-23 07:56:30', '10250.00', '20000.00', '9750.00', 0, 300000, 1, '2020-12-23 07:55:03', 1, '2020-12-23 07:56:41', '1.20', '117.00', '9633.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(25, '5', 'nh', NULL, 'hang', NULL, 'khach', '11', '', '2020-12-23 10:13:44', '2020-04-21 16:44:02', '11111.00', '120.00', '10991.00', 0, 400000, 1, '2020-12-21 10:13:47', 1, '2020-12-21 16:44:05', '1.00', '122.00', '10869.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(26, '6', 'nh', NULL, NULL, NULL, '', '11', '', '2020-12-22 14:40:46', '2020-05-22 14:42:31', '12350.00', '100.00', '12250.00', 100, 500000, 1, '2020-12-22 14:40:50', 1, '2020-12-22 16:58:33', '3.10', '380.00', '11870.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(27, '7', 'xh', NULL, NULL, NULL, '', '100', '', '2020-12-21 07:54:56', '2020-06-23 07:56:30', '10250.00', '20000.00', '9750.00', 0, 600000, 1, '2020-12-23 07:55:03', 1, '2020-12-23 07:56:41', '1.20', '117.00', '9633.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(28, '5', 'nh', NULL, 'hang', NULL, 'khach', '11', '', '2020-12-20 10:13:44', '2020-07-21 16:44:02', '11111.00', '120.00', '10991.00', 0, 700000, 1, '2020-12-21 10:13:47', 1, '2020-12-21 16:44:05', '1.00', '122.00', '10869.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(29, '6', 'nh', NULL, 'go', NULL, '', '11', '', '2020-12-26 14:40:46', '2020-08-22 14:42:31', '12350.00', '100.00', '12250.00', 100, 800000, 1, '2020-12-22 14:40:50', 1, '2020-12-22 16:58:33', '3.10', '380.00', '11870.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(30, '7', 'xh', NULL, NULL, NULL, '', '100', '', '2020-12-25 07:54:56', '2020-09-23 07:56:30', '10250.00', '20000.00', '9750.00', 0, 900000, 1, '2020-12-23 07:55:03', 1, '2020-12-23 07:56:41', '1.20', '117.00', '9633.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(31, '5', 'nh', NULL, NULL, NULL, 'khach', '11', '', '2020-12-26 10:13:44', '2020-10-21 16:44:02', '11111.00', '120.00', '10991.00', 0, 10000, 1, '2020-12-21 10:13:47', 1, '2020-12-21 16:44:05', '1.00', '122.00', '10869.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(32, '6', 'nh', NULL, NULL, NULL, '', '11', '', '2020-12-25 14:40:46', '2020-11-22 14:42:31', '12350.00', '100.00', '12250.00', 100, 11000, 1, '2020-12-22 14:40:50', 1, '2020-12-22 16:58:33', '3.10', '380.00', '11870.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(33, '7', 'xh', NULL, NULL, NULL, '', '100', '', '2020-12-24 07:54:56', '2020-12-23 07:56:30', '10250.00', '20000.00', '9750.00', 0, 12000, 1, '2020-12-23 07:55:03', 1, '2020-12-23 07:56:41', '1.20', '117.00', '9633.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(41, '5', 'nh', NULL, 'hang', NULL, '', '152', '', '2020-12-31 10:34:10', '2020-12-31 10:34:14', '10000.00', '5623.00', '4377.00', 0, 0, 17, '2020-12-31 10:34:49', 17, '2020-12-31 10:41:40', '1.30', '57.00', '4320.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(42, '6', 'nh', NULL, 'go', NULL, '', '11', '', '2020-12-31 10:41:48', '2020-12-31 10:41:49', '23232.00', '2323.00', '20909.00', 0, 20909, 17, '2020-12-31 10:42:03', NULL, NULL, '1.30', '272.00', '20637.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(43, '12', 'nh', NULL, 'hang', NULL, '', '10', '', '2021-01-02 09:44:27', '2021-01-02 09:44:29', '10000.00', '2000.00', '8000.00', 0, 0, 1, '2021-01-02 09:44:33', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1'),
(44, '13', 'nh', NULL, 'hang', NULL, '', '10', '', '2021-01-02 13:51:42', '2021-01-02 13:51:47', '25362.00', '10000.00', '15362.00', 0, 0, 1, '2021-01-02 13:52:04', NULL, NULL, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight_apptype`
--

CREATE TABLE `tbweight_apptype` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `func_call` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight_apptype`
--

INSERT INTO `tbweight_apptype` (`id`, `name`, `func_call`) VALUES
(1, 'Cân thường', ''),
(2, 'Cân tạp chất tính tiền', 'weight_tapchat_tt');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight_control`
--

CREATE TABLE `tbweight_control` (
  `id` int(11) NOT NULL,
  `name` varchar(10) DEFAULT NULL,
  `baudrate` int(11) DEFAULT NULL,
  `databit` int(11) DEFAULT NULL,
  `parity` int(11) DEFAULT NULL,
  `stopbits` int(11) DEFAULT NULL,
  `regex` text DEFAULT NULL,
  `endbyte` varchar(10) DEFAULT NULL,
  `reverse` tinyint(4) DEFAULT NULL,
  `mode` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight_control`
--

INSERT INTO `tbweight_control` (`id`, `name`, `baudrate`, `databit`, `parity`, `stopbits`, `regex`, `endbyte`, `reverse`, `mode`) VALUES
(1, 'D2008FA', 2400, 8, 0, NULL, '\\+([0-9]{6})', '', NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight_type`
--

CREATE TABLE `tbweight_type` (
  `id` varchar(10) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight_type`
--

INSERT INTO `tbweight_type` (`id`, `name`) VALUES
('nh', 'Cân nhập'),
('none', 'Cân thường'),
('xh', 'Cân xuất');

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `viwBaocaotong`
-- (See below for the actual view)
--
CREATE TABLE `viwBaocaotong` (
);

-- --------------------------------------------------------

--
-- Cấu trúc cho view `viwBaocaotong`
--
DROP TABLE IF EXISTS `viwBaocaotong`;

CREATE ALGORITHM=UNDEFINED DEFINER=`can15657_canquochung`@`%` SQL SECURITY DEFINER VIEW `viwBaocaotong`  AS  select `tbweight`.`id` AS `IdWeight`,`tbweight`.`net_weight` AS `net_weight`,`tbweight`.`customer_id` AS `customer_id`,`tbweight`.`items_id` AS `items_id`,`tbweight`.`date_out` AS `date_out`,`tbweight`.`date_in` AS `date_in`,`tbweight`.`items_name` AS `items_name`,`tbweight`.`customer_name` AS `customer_name`,`tbweight`.`tapchat` AS `tapchat`,`tbweight`.`khauhao` AS `khauhao`,`tbweight`.`weight_type` AS `weight_type`,cast(`tbweight`.`date_out` as date) AS `gngay` from `tbweight` ;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tbcustomer`
--
ALTER TABLE `tbcustomer`
  ADD PRIMARY KEY (`idcustomer`);

--
-- Chỉ mục cho bảng `tbitems`
--
ALTER TABLE `tbitems`
  ADD PRIMARY KEY (`iditems`);

--
-- Chỉ mục cho bảng `tbmenu`
--
ALTER TABLE `tbmenu`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `tbsettings`
--
ALTER TABLE `tbsettings`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbusers_group`
--
ALTER TABLE `tbusers_group`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbusers_permisson`
--
ALTER TABLE `tbusers_permisson`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbusers_role`
--
ALTER TABLE `tbusers_role`
  ADD PRIMARY KEY (`idtbusers_role`);

--
-- Chỉ mục cho bảng `tbweight`
--
ALTER TABLE `tbweight`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbweight_apptype`
--
ALTER TABLE `tbweight_apptype`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbweight_control`
--
ALTER TABLE `tbweight_control`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbweight_type`
--
ALTER TABLE `tbweight_type`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tbusers`
--
ALTER TABLE `tbusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT cho bảng `tbusers_group`
--
ALTER TABLE `tbusers_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT cho bảng `tbusers_permisson`
--
ALTER TABLE `tbusers_permisson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- AUTO_INCREMENT cho bảng `tbusers_role`
--
ALTER TABLE `tbusers_role`
  MODIFY `idtbusers_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tbweight`
--
ALTER TABLE `tbweight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT cho bảng `tbweight_apptype`
--
ALTER TABLE `tbweight_apptype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `tbweight_control`
--
ALTER TABLE `tbweight_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
