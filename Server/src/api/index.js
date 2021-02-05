var { router } = require("../setting_require/require_Modules");

var home = require("./home");
var weight = require("./weight");
var account = require("./account");
var admin = require("./admin");
var users = require("./users");

// Home
router.use("/Home", home);

// Weight
router.use("/Weight", weight);

// Account
router.use("/Account", account);

// Admin
router.use("/Admin", admin);

// User
router.use("/Users", users);

module.exports = router;
