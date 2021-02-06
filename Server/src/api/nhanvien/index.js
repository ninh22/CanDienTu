var { router } = require("../../setting_require/require_Modules");

var srcGetNhanVien = require("./src/getNhanVien");
var srcAddNhanVien = require("./src/addNhanVien");

router.post("/DanhSachNhanVien", srcGetNhanVien.GetNhanVien);
router.post("/DanhSachLoaiNhanVien", srcGetNhanVien.DanhSachLoaiNhanVien);
router.post("/ThemNhanVienMoi", srcAddNhanVien.AddNhanVien);
module.exports = router;