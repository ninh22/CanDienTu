var { router, con, md5 } = require("../setting_require/require_Modules");

// Đăng nhập
router.post("/Login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  password = md5(password + "@haiviet");
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbusers` WHERE username = '" +
        username +
        "' AND password = '" +
        password +
        "'",
      function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

// check account status
router.post("/CheckStatusUser", function (req, res) {
  var id = req.body.id;
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbusers` WHERE id = " + id,
      function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

// check pass
router.post("/CheckPass", function (req, res) {
  var password = req.body.password;
  password = md5(password + "@haiviet");
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbusers` WHERE password = '" + password + "'",
      function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

// change pass
router.post("/ChangePass", function (req, res) {
  var password = req.body.password;
  var id = req.body.id;
  password = md5(password + "@haiviet");
  con.connect(function (err) {
    con.query(
      "UPDATE `tbusers` SET password = '" + password + "' WHERE id = " + id,
      function (err, result) {
        if (err) throw err;
        res.json("successed");
      }
    );
  });
});

module.exports = router;
