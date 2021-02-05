var { con } = require("../../../setting_require/require_Modules");

const WeightAppType = async (req, res) => {
  // var id = 3;
  var id = req.body.id;
  con.connect(function (err) {
    con.query(
      "SELECT idweight_apptype FROM `tbusers_group` WHERE id = " + id,
      function (err, result) {
        if (err) throw err;
        con.query(
          "SELECT name FROM `tbweight_apptype` WHERE id = " +
            result[0].idweight_apptype,
          function (err, result) {
            if (err) throw err;
            switch (result[0].name) {
              case "Cân dịch vụ":
                res.json(false);
                break;
              case "Cân doanh nghiệp":
                res.json(true);
                break;
            }
          }
        );
      }
    );
  });
};

module.exports = {
  WeightAppType,
};
