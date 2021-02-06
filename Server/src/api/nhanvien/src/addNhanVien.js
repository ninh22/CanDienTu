var { con } = require("../../../setting_require/require_Modules");

const AddNhanVien = async (req, res) => {
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
      var sql = "INSERT INTO `app_NhanVien` (`id_NV`, `ten_NV`, `ngaysinh_NV`, `soCMND_NV`, `sdt_NV`, `diachi_NV`, `email_NV`, `ngayvaolam_NV`, `id_loaiNV`) VALUES ('"+id_NV+"', '"+ten_NV+"', '"+ngaysinh_NV+"', '"+soCMND_NV+"', '"+sdt_NV+"', '"+diachi_NV+"', '"+email_NV+"', '"+ngayvaolam_NV+"', '"+loai_NV+"');";
      con.query(sql, async function (err, result) {
        if (err) throw err;
        res.send('success');
      }
      );
    });
};

module.exports = {
    AddNhanVien,
};
