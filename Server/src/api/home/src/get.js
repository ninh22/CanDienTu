var { con } = require("../../../setting_require/require_Modules");

const GetNumber = (req, res) => {
  con.connect(function (err) {
    con.query(
      "SELECT value FROM `tbsettings` WHERE name = 'phonenumber'",
      function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
};

module.exports = {
  GetNumber,
};
