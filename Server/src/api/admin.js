var { router, con, md5 } = require("../setting_require/require_Modules");

// Tìm kiếm usersGroup
router.post("/SearchUsersGroup", async function (req, res) {
  var name = req.body.name;
  var page = req.body.page;
  var check = "notfull";
  var maxpage = null;
  var limit = req.body.limit;
  var offset = null;
  var count = null;
  con.connect(function (err) {
    con.query(
      "SELECT COUNT(*) FROM `tbusers_group` WHERE enable = 1 AND name LIKE '%" +
        name +
        "%'",
      async function (err, result) {
        if (err) throw err;
        count = await result[0]["COUNT(*)"];
        maxpage = Math.ceil(count / limit);
        offset = (page - 1) * limit;
        var sql =
          "SELECT * FROM `tbusers_group` WHERE enable = 1 AND name LIKE '%" +
          name +
          "%' ORDER BY id DESC LIMIT " +
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

// Đếm users thuộc usersGroup
router.post("/CountUsersOfUsersGroup", async function (req, res) {
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
});

// Tìm kiếm users
router.post("/SearchUsers", async function (req, res) {
  var idusergroup = req.body.idusergroup;
  var username = req.body.username;
  var page = req.body.page;
  var check = "notfull";
  var maxpage = null;
  var limit = req.body.limit;
  var offset = null;
  var count = null;
  con.connect(function (err) {
    con.query(
      "SELECT COUNT(*) FROM `tbusers` WHERE idusergroup = " +
        idusergroup +
        " AND username LIKE '%" +
        username +
        "%'",
      async function (err, result) {
        if (err) throw err;
        count = await result[0]["COUNT(*)"];
        maxpage = Math.ceil(count / limit);
        offset = (page - 1) * limit;
        var sql =
          "SELECT * FROM `tbusers` WHERE idusergroup = " +
          idusergroup +
          " AND username LIKE '%" +
          username +
          "%' ORDER BY id DESC LIMIT " +
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

// Xoá users
router.post("/DeleteUsers", async function (req, res) {
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
});

// Thêm userGroups
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
router.post("/AddUsersGroup", AddUsersGroup);

// Thêm Tài khoản
const AddAccount = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var idusergroup = req.body.idusergroup;
  var iduserrole = 3;
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
router.post("/AddAccount", AddAccount);

// Lấy all thông tin usersGroup
router.post("/GetAllUsersGroup", async function (req, res) {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbusers_group` WHERE enable = 1 ORDER BY id DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

// Lấy all thông tin weight_apptype
router.post("/GetAllWeightAppType", async function (req, res) {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbweight_apptype` ORDER BY id DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

// Lấy all thông tin app_types
router.post("/GetAllAppTypes", async function (req, res) {
  con.connect(function (err) {
    con.query(
      "SELECT * FROM `tbapp_types` ORDER BY idapp_types DESC",
      async function (err, result) {
        if (err) throw err;
        res.json(result);
      }
    );
  });
});

module.exports = router;
