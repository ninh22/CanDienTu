var { router, con } = require("../setting_require/require_Modules");

// Tìm kiếm phiếu cân
router.post("/SearchPhieuCan", async function (req, res) {
  var truct_no = req.body.truct_no;
  var page = req.body.page;
  var check = "notfull";
  var maxpage = null;
  var limit = req.body.limit;
  var offset = null;
  var count = null;
  con.connect(function (err) {
    con.query(
      "SELECT COUNT(*) FROM `tbweight` WHERE enable = 1 AND truct_no LIKE '%" +
        truct_no +
        "%'",
      async function (err, result) {
        if (err) throw err;
        count = await result[0]["COUNT(*)"];
        maxpage = Math.ceil(count / limit);
        offset = (page - 1) * limit;
        var sql =
          "SELECT * FROM `tbweight` WHERE enable = 1 AND truct_no LIKE '%" +
          truct_no +
          "%' ORDER BY date_in DESC LIMIT " +
          limit +
          " OFFSET " +
          offset;
        if (page < maxpage) {
          //res.json({count: count, maxpage: maxpage, offset: offset});
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

module.exports = router;
