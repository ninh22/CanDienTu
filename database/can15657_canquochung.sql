-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th1 19, 2021 lúc 10:42 PM
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
    declare done bool;
	DECLARE curMenu CURSOR FOR select name from tbmenu;
    declare continue handler for not found set done=1;
	open curMenu;
	menuloop : loop
		fetch curMenu into nameMenu;
        if done = 1 then leave menuloop; end if;
			INSERT INTO tbusers_permisson 
				(userid,menuid,ExecuteShow,ExecuteAdd,ExecuteUpdate,ExecuteDelete)
			 VALUES
				(IdUser,nameMenu,0,0,0,0);
        if (not exists(select userid from tbusers_permisson where menuid = nameMenu and userid = IdUser)) then 
			INSERT INTO tbusers_permisson 
				(userid,menuid,ExecuteShow,ExecuteAdd,ExecuteUpdate,ExecuteDelete)
			 VALUES
				(IdUser,nameMenu,0,0,0,0);
		end if;
	end loop menuloop;
	close curMenu;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `CreateUserRole` (IN `IdUserRole` INT(11))  BEGIN
	declare nameMenu varchar(45);
    declare done bool;
	DECLARE curMenu CURSOR FOR select name from tbmenu;
    declare continue handler for not found set done=1;
	open curMenu;
	menuloop : loop
		fetch curMenu into nameMenu;
        if done = 1 then leave menuloop; end if;
        if (not exists(select user_role_id from tbusers_permisson where menu_id = nameMenu and user_role_id = IdUserRole)) then 
			INSERT INTO tbusers_permisson 
				(user_role_id,menu_id,ExecuteShow,ExecuteAdd,ExecuteUpdate,ExecuteDelete)
			 VALUES
				(IdUserRole,nameMenu,0,0,0,0);
		end if;
	end loop menuloop;
	close curMenu;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_bao` (`act` VARCHAR(10), `sobao` DECIMAL(11), `tlbao` DECIMAL(11,2), `grbao` DECIMAL(11,2), `idweight` INT(11), `idgroups` INT(11))  BEGIN
	if (act = 'update') THEN
		Update tbweight set value1=sobao,value2=tlbao,value3=grbao,value4=net_weight-grbao where id = idweight;
    end if;
    if (act = 'list') then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,price,price_total,
        value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
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
		`tbweight`.`value1` AS `sobao`,
        `tbweight`.`value2` AS `tlbao`,
        `tbweight`.`value3` AS `grbao`,
        `tbweight`.`value4` AS `tltt_bao`
		FROM
        (`tbweight`
        JOIN `tbweight_type` ON (`tbweight`.`weight_type` = `tbweight_type`.`id`)) 
		Where `tbweight`.`id` = idweight
		ORDER BY CAST(`tbweight`.`date_out`
        AS DATE);
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_canbao` (`act` VARCHAR(10), `sobao` DECIMAL(11), `tlbao` DECIMAL(11,2), `grbao` DECIMAL(11,2), `idweight` INT(11), `idgroups` INT(11))  BEGIN
	if (act = 'update') THEN
		Update tbweight set value1=sobao,value2=tlbao,value3=grbao,value4=net_weight-grbao where id = idweight;
    end if;
    if (act = 'list') then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,price,price_total,
        value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
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
		`tbweight`.`value1` AS `sobao`,
        `tbweight`.`value2` AS `tlbao`,
        `tbweight`.`value3` AS `grbao`,
        `tbweight`.`value4` AS `tltt_bao`
		FROM
        (`tbweight`
        JOIN `tbweight_type` ON (`tbweight`.`weight_type` = `tbweight_type`.`id`)) 
		Where `tbweight`.`id` = idweight
		ORDER BY CAST(`tbweight`.`date_out`
        AS DATE);
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_canbao_report` (`ptruct_no` VARCHAR(20), `pitem_name` NVARCHAR(50), `pcustomer_name` NVARCHAR(50), `date_from` DATETIME, `date_to` DATETIME, `idgroups` INT, `weighttype` VARCHAR(10))  BEGIN
	if  (pcustomer_name <> "") and (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and `enable` = true
        and weight_type = weighttype
        and items_name = pitem_name 
        and customer_name = pcustomer_name;
	elseif (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and items_name = pitem_name;
    elseif (pcustomer_name <> "") then
    	select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true
        and customer_name = pcustomer_name;
	elseif (ptruct_no <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and truct_no = ptruct_no
        and `enable` = true;
	else 
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as sobao,value2 as tlbao,value3 as grbao,value4 as tltt_bao,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true;
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_report` (`ptruct_no` VARCHAR(20), `pitem_name` NVARCHAR(50), `pcustomer_name` NVARCHAR(50), `date_from` DATETIME, `date_to` DATETIME, `idgroups` INT, `weighttype` VARCHAR(10))  BEGIN
	if  (pcustomer_name <> "") and (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and `enable` = true
        and weight_type = weighttype
        and items_name = pitem_name 
        and customer_name = pcustomer_name;
	elseif (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and items_name = pitem_name;
    elseif (pcustomer_name <> "") then
    	select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true
        and customer_name = pcustomer_name;
	elseif (ptruct_no <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and truct_no = ptruct_no
        and `enable` = true;
	else 
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true;
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_report_total` (`pweight_type` VARCHAR(10), `preport_type` INT, `pidgroup` INT)  BEGIN
if (preport_type = 0) then
	SELECT items_name,customer_name,Sum(net_weight) As total_net,sum(price_total) as total_price 
    FROM tbweight
    where 
    weight_type = pweight_type and 
    idusergroup = pidgroup
    group by items_name;
elseif (preport_type = 1) then
	SELECT items_name,customer_name,Sum(net_weight) As total_net,sum(price_total) as total_price 
    FROM tbweight
    where 
    weight_type = pweight_type and 
    idusergroup = pidgroup
    group by customer_name;
elseif (preport_type = 2) then
	SELECT items_name,customer_name,Sum(net_weight) As total_net,sum(price_total) as total_price 
    FROM tbweight
    where 
    weight_type = pweight_type and 
    idusergroup = pidgroup
    group by items_name,customer_name;
end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tapchat_tt` (`act` VARCHAR(10), `phantram` DECIMAL(11,2), `trubi` DECIMAL(11), `dongia` DECIMAL(11), `thanhtien` DECIMAL(11), `idweight` INT(11), `idgroups` INT(11))  BEGIN
	if (act = 'update') THEN
		Update tbweight set value1=phantram,value2=trubi,value3=net_weight-trubi,price=dongia,price_total=thanhtien where id = idweight;
    end if;
    if (act = 'list') then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
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
		`tbweight`.`value1` AS `phantram_tc`,
        `tbweight`.`value2` AS `trubi_tc`,
        `tbweight`.`value3` AS `tltt_tc`
		FROM
        (`tbweight`
        JOIN `tbweight_type` ON (`tbweight`.`weight_type` = `tbweight_type`.`id`)) 
		Where `tbweight`.`id` = idweight
		ORDER BY CAST(`tbweight`.`date_out`
        AS DATE);
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tapchat_tt_report` (`ptruct_no` VARCHAR(20), `pitem_name` NVARCHAR(50), `pcustomer_name` NVARCHAR(50), `date_from` DATETIME, `date_to` DATETIME, `idgroups` INT, `weighttype` VARCHAR(10))  BEGIN
	if  (pcustomer_name <> "") and (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and `enable` = true
        and weight_type = weighttype
        and items_name = pitem_name 
        and customer_name = pcustomer_name;
	elseif (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and items_name = pitem_name;
    elseif (pcustomer_name <> "") then
    	select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true
        and customer_name = pcustomer_name;
	elseif (ptruct_no <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and truct_no = ptruct_no
        and `enable` = true;
	else 
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as phantram_tc,value2 as trubi_tc,value3 as tltt_tc,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true;
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tramcanso1` (`act` VARCHAR(10), `dongia` DECIMAL(11), `thanhtien` DECIMAL(11), `thanhtien2` DECIMAL(11), `idweight` INT(11), `idgroups` INT(11))  BEGIN
	if (act = 'update') THEN
		Update tbweight set price=dongia,price_total=thanhtien+thanhtien2,value1=thanhtien,value2=thanhtien2 where id = idweight;
    end if;
    if (act = 'list') then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
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
		`tbweight`.`value1` AS `thanhtien_tc1`,
        `tbweight`.`value2` AS `thanhtien2_tc1`
		FROM
        (`tbweight`
        JOIN `tbweight_type` ON (`tbweight`.`weight_type` = `tbweight_type`.`id`)) 
		Where `tbweight`.`id` = idweight
		ORDER BY CAST(`tbweight`.`date_out`
        AS DATE);
    end if;
END$$

CREATE DEFINER=`can15657_canquochung`@`%` PROCEDURE `weight_tramcanso1_report` (`ptruct_no` VARCHAR(20), `pitem_name` NVARCHAR(50), `pcustomer_name` NVARCHAR(50), `date_from` DATETIME, `date_to` DATETIME, `idgroups` INT, `weighttype` VARCHAR(10))  BEGIN
	if  (pcustomer_name <> "") and (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and `enable` = true
        and weight_type = weighttype
        and items_name = pitem_name 
        and customer_name = pcustomer_name;
	elseif (pitem_name <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and items_name = pitem_name;
    elseif (pcustomer_name <> "") then
    	select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`,weight_type
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true
        and customer_name = pcustomer_name;
	elseif (ptruct_no <> "") then
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and truct_no = ptruct_no
        and `enable` = true;
	else 
		select id,formcode,weight_type,items_id,items_name,customer_id,customer_name,
        truct_no,notes,date_in,date_out,weight_1,weight_2,net_weight,
        price,price_total,value1 as thanhtien_tc1,value2 as thanhtien2_tc1,
        idusergroup,createby,createtime,modifiredby,modifiredtime,`enable`
		from tbweight 
		where idusergroup = idgroups 
        and date_in between date_from and date_to 
        and weight_type = weighttype
        and `enable` = true;
    end if;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbapp_types`
--

CREATE TABLE `tbapp_types` (
  `idapp_types` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbapp_types`
--

INSERT INTO `tbapp_types` (`idapp_types`, `name`) VALUES
(1, 'Cân thường'),
(2, 'Cân tạp chất - tính tiền'),
(3, 'Cân bao'),
(4, 'Trạm cân số 1');

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
('caphenhan', 'Cà phê nhân', 1, b'1'),
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
('frmExportExcel', 'Xuất file excel', b'1'),
('frmItems', 'Hàng hóa', b'1'),
('frmReportListWeight', 'Báo cáo', b'1'),
('frmSqlTool', 'Sql tool', b'1'),
('frmSupport', 'Hỗ trợ', b'1'),
('frmUsers', 'Quản lý user', b'1'),
('frmUsersrole', 'Phân quyền', b'1'),
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
(17, 'caphe706', '7E1801739DD9867835F666182B9E1B75', 3, 4),
(100, 'caphe', 'bd29e9e3abc078b85ef6116f1e681d3d', 3, 1),
(101, 'caphe89', '27b3823997fcc2167e34674073304298', 3, 1),
(103, 'huuhai880', '06a0204aa2a6f97c2769b3d954188b32', 3, 1),
(104, 'canbao', '7E1801739DD9867835F666182B9E1B75', 31, 5),
(105, 'user89', '1d339d30db898a06ec0afa7025418658', 3, 3),
(111, 'admin1', '1d339d30db898a06ec0afa7025418658', 0, 3),
(113, 'tramcanso1', '99DAE108BF47EE2C88D58B5E3D102965', 1, 4);

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
  `idweight_apptype` int(11) NOT NULL,
  `idapp_types` int(11) NOT NULL,
  `enable` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_group`
--

INSERT INTO `tbusers_group` (`id`, `name`, `address`, `phonenumber`, `lastid`, `startdate`, `enddate`, `sign_1`, `sign_2`, `sign_3`, `sign_4`, `idweight_apptype`, `idapp_types`, `enable`) VALUES
(1, 'Trạm Cân Số 1', '78, Đường 10/3, Phường Tân Lợi, TP Buôn Ma Thuột', '09819 12347', 2, NULL, NULL, 'Khách hàng', '', '', 'Người cân xe', 2, 4, b'1'),
(3, 'Cà phê 706', 'Gia Lai', '097893332', 13, '2021-01-04 00:00:00', NULL, '', '', '', 'Người cân', 2, 2, b'1'),
(30, '123', '123', '0946249525', 1, NULL, '2021-01-02 23:59:59', NULL, NULL, NULL, NULL, 1, 3, b'1'),
(31, 'Cân bao', 'Tp Buon Ma Thuột Đắk Lắk', '0123456789', 6, NULL, NULL, '', '', '', 'Người cân xe', 1, 1, b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers_permisson`
--

CREATE TABLE `tbusers_permisson` (
  `id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL,
  `menu_id` varchar(45) NOT NULL,
  `ExecuteShow` bit(1) NOT NULL,
  `ExecuteAdd` bit(1) NOT NULL,
  `ExecuteUpdate` bit(1) NOT NULL,
  `ExecuteDelete` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_permisson`
--

INSERT INTO `tbusers_permisson` (`id`, `user_role_id`, `menu_id`, `ExecuteShow`, `ExecuteAdd`, `ExecuteUpdate`, `ExecuteDelete`) VALUES
(1, 1, 'frmBackup', b'0', b'0', b'0', b'0'),
(2, 1, 'frmCan', b'1', b'1', b'1', b'1'),
(3, 1, 'frmChangePass', b'1', b'0', b'0', b'0'),
(4, 1, 'frmConfigPrints', b'1', b'0', b'0', b'0'),
(5, 1, 'frmConfigs', b'1', b'0', b'0', b'0'),
(6, 1, 'frmCustomer', b'1', b'1', b'1', b'1'),
(7, 1, 'frmDSCan', b'1', b'1', b'1', b'1'),
(8, 1, 'frmExportExcel', b'1', b'0', b'0', b'0'),
(9, 1, 'frmItems', b'1', b'1', b'1', b'1'),
(10, 1, 'frmReportListWeight', b'1', b'1', b'1', b'1'),
(11, 1, 'frmSqlTool', b'1', b'0', b'0', b'0'),
(12, 1, 'frmSupport', b'1', b'0', b'0', b'0'),
(13, 1, 'frmUsers', b'1', b'1', b'1', b'1'),
(15, 1, 'frmUsersrole', b'1', b'1', b'1', b'1'),
(16, 1, 'frmWeightControl', b'1', b'1', b'1', b'1'),
(17, 3, 'frmBackup', b'0', b'0', b'0', b'0'),
(18, 3, 'frmCan', b'1', b'1', b'1', b'1'),
(19, 3, 'frmChangePass', b'1', b'0', b'0', b'0'),
(20, 3, 'frmConfigPrints', b'1', b'0', b'0', b'0'),
(21, 3, 'frmConfigs', b'1', b'0', b'0', b'0'),
(22, 3, 'frmCustomer', b'1', b'1', b'1', b'1'),
(23, 3, 'frmDSCan', b'1', b'1', b'1', b'1'),
(24, 3, 'frmExportExcel', b'1', b'0', b'0', b'0'),
(25, 3, 'frmItems', b'1', b'1', b'1', b'1'),
(26, 3, 'frmReportListWeight', b'1', b'0', b'0', b'0'),
(27, 3, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(28, 3, 'frmSupport', b'1', b'0', b'0', b'0'),
(29, 3, 'frmUsers', b'0', b'0', b'0', b'0'),
(30, 3, 'frmUsersrole', b'0', b'0', b'0', b'0'),
(31, 3, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(32, 4, 'frmBackup', b'0', b'0', b'0', b'0'),
(33, 4, 'frmCan', b'1', b'1', b'1', b'1'),
(34, 4, 'frmChangePass', b'1', b'0', b'0', b'0'),
(35, 4, 'frmConfigPrints', b'1', b'0', b'0', b'0'),
(36, 4, 'frmConfigs', b'0', b'0', b'0', b'0'),
(37, 4, 'frmCustomer', b'1', b'1', b'1', b'1'),
(38, 4, 'frmDSCan', b'1', b'1', b'1', b'1'),
(39, 4, 'frmExportExcel', b'1', b'0', b'0', b'0'),
(40, 4, 'frmItems', b'1', b'1', b'1', b'1'),
(41, 4, 'frmReportListWeight', b'1', b'0', b'0', b'0'),
(42, 4, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(43, 4, 'frmSupport', b'1', b'0', b'0', b'0'),
(44, 4, 'frmUsers', b'0', b'0', b'0', b'0'),
(45, 4, 'frmUsersrole', b'0', b'0', b'0', b'0'),
(46, 4, 'frmWeightControl', b'0', b'0', b'0', b'0'),
(47, 5, 'frmBackup', b'0', b'0', b'0', b'0'),
(48, 5, 'frmCan', b'1', b'1', b'0', b'1'),
(49, 5, 'frmChangePass', b'1', b'0', b'0', b'0'),
(50, 5, 'frmConfigPrints', b'1', b'0', b'0', b'0'),
(51, 5, 'frmConfigs', b'0', b'0', b'0', b'0'),
(52, 5, 'frmCustomer', b'1', b'1', b'1', b'1'),
(53, 5, 'frmDSCan', b'1', b'0', b'0', b'0'),
(54, 5, 'frmExportExcel', b'1', b'0', b'0', b'0'),
(55, 5, 'frmItems', b'1', b'1', b'1', b'1'),
(56, 5, 'frmReportListWeight', b'1', b'0', b'0', b'0'),
(57, 5, 'frmSqlTool', b'0', b'0', b'0', b'0'),
(58, 5, 'frmSupport', b'1', b'0', b'0', b'0'),
(59, 5, 'frmUsers', b'0', b'0', b'0', b'0'),
(60, 5, 'frmUsersrole', b'0', b'0', b'0', b'0'),
(61, 5, 'frmWeightControl', b'0', b'0', b'0', b'0');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbusers_role`
--

CREATE TABLE `tbusers_role` (
  `idtbusers_role` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `administration` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbusers_role`
--

INSERT INTO `tbusers_role` (`idtbusers_role`, `name`, `administration`) VALUES
(1, 'Admin', b'1'),
(3, 'Kỹ thuật', b'0'),
(4, 'Quản lý', b'0'),
(5, 'Trạm cân', b'0');

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
(1, '2', 'xh', NULL, '', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '10000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 1, b'1'),
(2, '2', 'xh', 'caphetuoi', 'Cà phê tươi', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '10000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(3, '2', 'xh', 'caphetuoi', 'Cà phê tươi', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '15000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(4, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '5000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(5, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '5500.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(6, '2', 'xh', 'da', 'Đá', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '7000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(7, '2', 'xh', 'da', 'Đá', NULL, '', '1', '', '2021-01-18 14:36:12', '2021-01-18 14:37:43', '4512.00', '5000.00', '5488.00', 0, 30000, 1, '2021-01-18 14:36:22', 1, '2021-01-18 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(8, '2', 'xh', 'caphetuoi', 'Cà phê tươi', NULL, '', '1', '', '2021-01-13 14:36:12', '2021-01-13 14:37:43', '4512.00', '15000.00', '5488.00', 0, 30000, 1, '2021-01-13 14:36:22', 1, '2021-01-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(9, '2', 'xh', 'caphetuoi', 'Cà phê tươi', NULL, '', '1', '', '2021-01-13 14:36:12', '2021-01-13 14:37:43', '4512.00', '17000.00', '5488.00', 0, 30000, 1, '2021-01-13 14:36:22', 1, '2021-01-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(10, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2021-01-13 14:36:12', '2021-01-13 14:37:43', '4512.00', '10000.00', '5488.00', 0, 30000, 1, '2021-01-13 14:36:22', 1, '2021-01-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(11, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2021-01-13 14:36:12', '2021-01-13 14:37:43', '4512.00', '7000.00', '5488.00', 0, 30000, 1, '2021-01-13 14:36:22', 1, '2021-01-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(12, '2', 'xh', 'go', 'Gỗ', NULL, '', '1', '', '2020-03-13 14:36:12', '2020-03-13 14:37:43', '4512.00', '10000.00', '5488.00', 0, 30000, 1, '2020-03-13 14:36:22', 1, '2020-03-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(13, '2', 'xh', 'go', 'Gỗ', NULL, '', '1', '', '2020-03-13 14:36:12', '2020-03-13 14:37:43', '4512.00', '7000.00', '5488.00', 0, 30000, 1, '2020-03-13 14:36:22', 1, '2020-03-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(14, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2020-03-20 14:36:12', '2020-03-20 14:37:43', '4512.00', '15000.00', '5488.00', 0, 30000, 1, '2020-03-20 14:36:22', 1, '2020-03-20 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(15, '2', 'xh', 'caphenhan', 'Cà phê nhân', NULL, '', '1', '', '2020-03-20 14:36:12', '2020-03-20 14:37:43', '4512.00', '10000.00', '5488.00', 0, 30000, 1, '2020-03-20 14:36:22', 1, '2020-03-20 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1'),
(16, '2', 'xh', 'go', 'Gỗ', NULL, '', '1', '', '2021-01-13 14:36:12', '2021-01-13 14:37:43', '4512.00', '7000.00', '5488.00', 0, 30000, 1, '2021-01-13 14:36:22', 1, '2021-01-13 14:37:46', '10000.00', '20000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', 3, b'1');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight_apptype`
--

CREATE TABLE `tbweight_apptype` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight_apptype`
--

INSERT INTO `tbweight_apptype` (`id`, `name`) VALUES
(1, 'Cân dịch vụ'),
(2, 'Cân doanh nghiệp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbweight_control`
--

CREATE TABLE `tbweight_control` (
  `id` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `baudrate` int(11) NOT NULL,
  `databit` int(11) NOT NULL,
  `parity` int(11) NOT NULL,
  `stopbits` int(11) NOT NULL,
  `regex` text NOT NULL,
  `endbyte` varchar(10) NOT NULL,
  `mode` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tbweight_control`
--

INSERT INTO `tbweight_control` (`id`, `name`, `baudrate`, `databit`, `parity`, `stopbits`, `regex`, `endbyte`, `mode`) VALUES
(1, 'TF-0', 2400, 8, 0, 1, '\\+([0-9]{6})', '', 0);

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

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tbapp_types`
--
ALTER TABLE `tbapp_types`
  ADD PRIMARY KEY (`idapp_types`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT cho bảng `tbusers_group`
--
ALTER TABLE `tbusers_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT cho bảng `tbusers_permisson`
--
ALTER TABLE `tbusers_permisson`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT cho bảng `tbusers_role`
--
ALTER TABLE `tbusers_role`
  MODIFY `idtbusers_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `tbweight`
--
ALTER TABLE `tbweight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `tbweight_apptype`
--
ALTER TABLE `tbweight_apptype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `tbweight_control`
--
ALTER TABLE `tbweight_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
