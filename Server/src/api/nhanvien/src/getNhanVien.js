var { con } = require("../../../setting_require/require_Modules");
const GetNhanVien = async (req, res) => {
    var page = req.body.page;
    var check = "notfull";
    var maxpage = null;
    var limit = req.body.limit;
    var offset = null;
    var count = null;
    con.connect(function (err) {
        var sqlcount = "SELECT COUNT(*) AS 'item_count' FROM `app_NhanVien` ";
        con.query(sqlcount, async function (err, result) {
            if (err) throw err;
            count = await result[0].item_count;
            maxpage = Math.ceil(count / limit);
            offset = (page - 1) * limit;
            var sql = "SELECT * FROM `app_NhanVien` ORDER BY `ten_NV` ASC LIMIT 10 OFFSET 0";
            if (page < maxpage) {
                con.query(sql, async function (err, result) {
                    if (err) throw err;
                    res.json({ check: check, data: result });
                });
            } else if (page == maxpage) {
                check = "full";
                con.query(sql, async function (err, result) {
                    if (err) throw err;
                    res.json({ check: check, data: result });
                });
            } else if (page > maxpage) {
                check = "maxfull";
                res.json({ check: check, data: null });
            }
        }
        );
    });
}
// danh sách loại nhân viên
const DanhSachLoaiNhanVien = async (req, res) => {
    var page = req.body.page;
    var check = "notfull";
    var maxpage = null;
    var limit = req.body.limit;
    var offset = null;
    var count = null;
    con.connect(function (err) {
        var sqlcount = "SELECT COUNT(*) AS 'item_count' FROM `app_loaiNhanVien` ";
        con.query(sqlcount, async function (err, result) {
            if (err) throw err;
            count = await result[0].item_count;
            maxpage = Math.ceil(count / limit);
            offset = (page - 1) * limit;
            var sql = "SELECT * FROM `app_loaiNhanVien` ORDER BY `app_loaiNhanVien`.`ten_loaiNV` ASC LIMIT 10 OFFSET 0";
            if (page < maxpage) {
                con.query(sql, async function (err, result) {
                    if (err) throw err;
                    res.json({ check: check, data: result });
                });
            } else if (page == maxpage) {
                check = "full";
                con.query(sql, async function (err, result) {
                    if (err) throw err;
                    res.json({ check: check, data: result });
                });
            } else if (page > maxpage) {
                check = "maxfull";
                res.json({ check: check, data: null });
            }
        }
        );
    });
}
module.exports = {
    GetNhanVien,
    DanhSachLoaiNhanVien,
};