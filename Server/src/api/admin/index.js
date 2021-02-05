var { router } = require("../../setting_require/require_Modules");

var srcGet = require("./src/get");
var srcSearch = require("./src/search");
var srcAdd = require("./src/add");
var srcDelete = require("./src/delete");

// Tìm kiếm usersGroup
router.post("/SearchUsersGroup", srcSearch.SearchUsersGroup);

// Đếm users thuộc usersGroup
router.post("/CountUsersOfUsersGroup", srcGet.CountUsersOfUsersGroup);

// Tìm kiếm users
router.post("/SearchUsers", srcSearch.SearchUsers);

// Xoá users
router.post("/DeleteUsers", srcDelete.DeleteUsers);

// Thêm userGroups
router.post("/AddUsersGroup", srcAdd.AddUsersGroup);

// Thêm Tài khoản
router.post("/AddAccount", srcAdd.AddAccount);

// Lấy all thông tin usersGroup
router.post("/GetAllUsersGroup", srcGet.GetAllUsersGroup);

// Lấy all thông tin weight_apptype
router.post("/GetAllWeightAppType", srcGet.GetAllWeightAppType);

// Lấy all thông tin app_types
router.post("/GetAllAppTypes", srcGet.GetAllAppTypes);

module.exports = router;
