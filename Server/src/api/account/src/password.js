var { con, md5 } = require("../../../setting_require/require_Modules");

const CheckPass = (req, res) => {
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
};

const ChangePass = (req, res) => {
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
};

module.exports = {
  CheckPass,
  ChangePass,
};
