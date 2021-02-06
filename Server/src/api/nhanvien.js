var { router, con } = require("../setting_require/require_Modules");

// danh sách nhân viên

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
