var { con, md5 } = require("../../../setting_require/require_Modules");

const AddUsersGroup = async (req, res, next) => {
  var enable = 1;
  var name = req.body.name;
  var address = req.body.address;
  var phonenumber = req.body.phonenumber;
  var lastid = 1;
  var enddate = req.body.enddate;
  var idweight_apptype = req.body.idweight_apptype;
  var idapp_types = req.body.idapp_types;
  enddate += " 23:59:59";
  try {
    con.connect(function (err) {
      var sql =
        'INSERT INTO `tbusers_group`(`name`, `address`, `phonenumber`, `lastid`, `enddate`, `idweight_apptype`, `idapp_types`, `enable`) VALUES ("' +
        name +
        '", "' +
        address +
        '","' +
        phonenumber +
        '","' +
        lastid +
        '","' +
        enddate +
        '","' +
        idweight_apptype +
        '","' +
        idapp_types +
        '",' +
        enable +
        ")";
      con.query(sql, async function (err, result) {
        if (err) throw err;
        res.send("successed");
      });
    });
  } catch (e) {
    next(e);
  }
};

const AddAccount = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var idusergroup = req.body.idusergroup;
  var iduserrole = 5;
  password = md5(password + "@haiviet");
  try {
    con.connect(function (err) {
      con.query(
        "SELECT * FROM `tbusers` WHERE username = '" + username + "'",
        function (err, result) {
          if (err) throw err;
          switch (true) {
            case result[0] == undefined:
              var sql =
                'INSERT INTO `tbusers`(`username`, `password`, `idusergroup`, `iduserrole`) VALUES ("' +
                username +
                '","' +
                password +
                '","' +
                idusergroup +
                '","' +
                iduserrole +
                '")';
              con.query(sql, async function (err, result) {
                if (err) throw err;
                res.send("successed");
              });
              break;
            case result[0] !== undefined:
              res.send("failed");
              break;
          }
        }
      );
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  AddUsersGroup,
  AddAccount,
};
