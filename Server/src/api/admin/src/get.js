var { con } = require("../../../setting_require/require_Modules");

const GetAllUsersGroup = async (req, res) => {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbusers_group` WHERE enable = 1 ORDER BY id DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
};

const GetAllWeightAppType = async (req, res) => {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbweight_apptype` ORDER BY id DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
};

const GetAllAppTypes = async (req, res) => {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbapp_types` ORDER BY idapp_types DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
};

const CountUsersOfUsersGroup = async (req, res) => {
  var idusergroup = req.body.idusergroup;
  con.connect(function (err) {
    con.query(
      "SELECT COUNT(username) FROM `tbusers` WHERE idusergroup = " +
        idusergroup,
      async function (err, result) {
        if (err) throw err;
        res.json(result[0]["COUNT(username)"]);
      }
    );
  });
};

module.exports = {
  GetAllUsersGroup,
  GetAllWeightAppType,
  GetAllAppTypes,
  CountUsersOfUsersGroup,
};
