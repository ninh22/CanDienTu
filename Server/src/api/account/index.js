var { router } = require("../../setting_require/require_Modules");

var srcPassword = require("./src/password");
var srcGet = require("./src/get");

// Đăng nhập
router.post("/Login", srcGet.Login);

// check account status
router.post("/CheckStatusUser", srcGet.CheckStatusUser);

// check pass
router.post("/CheckPass", srcPassword.CheckPass);

// change pass
router.post("/ChangePass", srcPassword.ChangePass);

module.exports = router;
