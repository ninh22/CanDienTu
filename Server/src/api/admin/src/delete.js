var { con } = require("../../../setting_require/require_Modules");

const DeleteUsers = async (req, res, next) => {
  var id = req.body.id;
  try {
    con.connect(function (err) {
      con.query(
        "DELETE FROM `tbusers` WHERE `id` = " + id,
        async function (err, result) {
          if (err) throw err;
          res.json("successed");
        }
      );
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  DeleteUsers,
};
