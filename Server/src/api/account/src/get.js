var { con, md5 } = require("../../../setting_require/require_Modules");

const Login = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  password = md5(password + "@haiviet");
  con.connect(function (err) {
    var sql =
      "SELECT tbusers.id, tbusers.idusergroup, tbusers_role.name FROM `tbusers`, `tbusers_role` WHERE (tbusers.iduserrole = tbusers_role.idtbusers_role) AND (tbusers.username = '" +
      username +
      "' AND tbusers.password = '" +
      password +
      "')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
};

const CheckStatusUser = (req, res) => {
  var id = req.body.id;
  con.connect(function (err) {
    var sql =
      "SELECT tbusers_role.name FROM `tbusers_role` WHERE tbusers_role.idtbusers_role IN (SELECT tbusers.iduserrole FROM `tbusers` WHERE tbusers.id = " +
      id +
      ")";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  });
};

module.exports = {
  Login,
  CheckStatusUser,
};
