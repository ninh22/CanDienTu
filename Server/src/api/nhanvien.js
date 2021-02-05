var { router, con } = require("../setting_require/require_Modules");

// danh sách nhân viên
router.post("/DanhSachNhanVien", async function (req, res) {
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
});
// danh sách loại nhân viên
router.post("/DanhSachLoaiNhanVien", async function (req, res) {
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
});
// thêm nhân viên
router.post("/ThemNhanVienMoi", async function (req, res) {
  var id_NV= req.body.id_NV;
  var ten_NV= req.body.ten_NV;
  var ngaysinh_NV= req.body.ngaysinh_NV;
  var soCMND_NV= req.body.soCMND_NV;
  var sdt_NV= req.body.sdt_NV;
  var diachi_NV= req.body.diachi_NV;
  var email_NV= req.body.email_NV;
  var ngayvaolam_NV= req.body.ngayvaolam_NV;
  var loai_NV= req.body.loai_NV;
  
  con.connect(function (err) {
    var sqlcount = "SELECT COUNT(*) AS 'item_count' FROM `app_loaiNhanVien` ";
    con.query(sqlcount, async function (err, result) {
      if (err) throw err;
      res.send('success');
    }
    );
  });
});



module.exports = router;
