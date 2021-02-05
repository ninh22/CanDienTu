var { router, con } = require("../setting_require/require_Modules");

// Get số điện thoại
router.post("/GetNumber", function (req, res) {
  con.connect(function (err) {
    con.query(
      "SELECT value FROM `tbsettings` WHERE name = 'phonenumber'",
      function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

module.exports = router;
