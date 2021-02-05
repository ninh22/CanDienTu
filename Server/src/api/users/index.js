var { router } = require("../../setting_require/require_Modules");

var srcCheck = require("./src/check");
var srcOverview = require("./src/overview");
var srcDiagram = require("./src/diagram");
var srcSearch_Diagram = require("./src/search_diagram");

// Check loại users
router.post("/WeightAppType", srcCheck.WeightAppType);

// thống kê tổng quát về users
router.post("/UserOverview", srcOverview.UserOverview);

// Biểu đồ đường
router.post("/UserDiagramMap", srcDiagram.UserDiagramMap);

// Biểu đồ tròn
router.post("/UserDiagramProgress", srcDiagram.UserDiagramProgress);

// Biểu đồ đường tìm kiếm
router.post("/SearchDiagramMap", srcSearch_Diagram.SearchDiagramMap);

// Biểu đồ tròn tìm kiếm
router.post("/SearchDiagramProgress", srcSearch_Diagram.SearchDiagramProgress);

module.exports = router;
