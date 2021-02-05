var { router } = require("../../setting_require/require_Modules");

var srcSearch = require("./src/search");

// Tìm kiếm phiếu cân
router.post("/SearchPhieuCan", srcSearch.SearchPhieuCan);

module.exports = router;
