var { router } = require("../../setting_require/require_Modules");

var srcGet = require("./src/get");

// Get số điện thoại
router.post("/GetNumber", srcGet.GetNumber);

module.exports = router;
