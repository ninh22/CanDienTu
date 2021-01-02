var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var server = require("http").createServer(app);
var mysql = require("mysql");
var bodyParser = require("body-parser");
var md5 = require("md5");
var moment = require("moment");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
server.listen(process.env.PORT);
var con = mysql.createConnection({
  host: "localhost",
  user: "can15657_canquochung",
  password: "@Quochung1234",
  database: "can15657_canquochung",
});
// Admin
// Đăng nhập
app.post("/Login", function (req, res) {
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
// Tìm kiếm usersGroup
app.post("/SearchUsersGroup", async function (req, res) {
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
app.post("/CountUsersOfUsersGroup", async function (req, res) {
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
app.post("/SearchUsers", async function (req, res) {
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
app.post("/DeleteUsers", async function (req, res) {
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

// Thêm users
const AddUsersGroup = async (req, res, next) => {
  var enable = 1;
  var name = req.body.name;
  var address = req.body.address;
  var phonenumber = req.body.phonenumber;
  var lastid = 1;
  var enddate = req.body.enddate;
  var idweight_apptype = req.body.idweight_apptype;
  enddate += " 23:59:59";
  try {
    con.connect(function (err) {
      var sql =
        'INSERT INTO `tbusers_group`(`name`, `address`, `phonenumber`, `lastid`, `enddate`, `idweight_apptype`, `enable`) VALUES ("' +
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
app.post("/AddUsersGroup", AddUsersGroup);

// Thêm Tài khoản
const AddAccount = async (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  var idusergroup = req.body.idusergroup;
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
                'INSERT INTO `tbusers`(`username`, `password`, `idusergroup`) VALUES ("' +
                username +
                '","' +
                password +
                '","' +
                idusergroup +
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
app.post("/AddAccount", AddAccount);

// Tìm kiếm phiếu cân
app.post("/SearchPhieuCan", async function (req, res) {
  var truct_no = req.body.truct_no;
  var page = req.body.page;
  var check = "notfull";
  var maxpage = null;
  var limit = req.body.limit;
  var offset = null;
  var count = null;
  con.connect(function (err) {
    con.query(
      "SELECT COUNT(*) FROM `tbweight` WHERE enable = 1 AND truct_no LIKE '%" +
        truct_no +
        "%'",
      async function (err, result) {
        if (err) throw err;
        count = await result[0]["COUNT(*)"];
        maxpage = Math.ceil(count / limit);
        offset = (page - 1) * limit;
        var sql =
          "SELECT * FROM `tbweight` WHERE enable = 1 AND truct_no LIKE '%" +
          truct_no +
          "%' ORDER BY date_in DESC LIMIT " +
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

// check Pass
app.post("/CheckPass", function (req, res) {
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

// change Pass
app.post("/ChangePass", function (req, res) {
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

// Lấy all thông tin usersGroup
app.post("/GetAllUsersGroup", async function (req, res) {
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

// Lấy all thông tin usersGroup
app.post("/GetAllAppType", async function (req, res) {
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

// User
app.post("/UserOverview", async function (req, res) {
  var overview = req.body.overview;
  var idusergroup = req.body.idusergroup;
  var date_in = req.body.date_in;
  var truct_no = req.body.truct_no;

  var page = req.body.page;
  var check = "notfull";
  var maxpage = null;
  var limit = req.body.limit;
  var offset = null;
  var count = null;
  con.connect(async function (err) {
    switch (overview) {
      case false:
        con.query(
          "SELECT price_total FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
            idusergroup +
            " AND date_in LIKE '%" +
            date_in +
            "%'",
          async function (err, result) {
            if (err) throw err;
            let data = { countResult: 0, money: 0 };
            await result.map((l, i) => {
              data.money += 1;
              data.countResult += 1;
            });
            res.json(data);
          }
        );
        break;
      case true:
        con.query(
          "SELECT COUNT(*) FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
            idusergroup +
            " AND date_in LIKE '%" +
            date_in +
            "%' AND truct_no LIKE '%" +
            truct_no +
            "%'",
          async function (err, result) {
            if (err) throw err;
            count = await result[0]["COUNT(*)"];
            maxpage = Math.ceil(count / limit);
            offset = (page - 1) * limit;
            var sql =
              "SELECT * FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
              idusergroup +
              " AND date_in LIKE '%" +
              date_in +
              "%' AND truct_no LIKE '%" +
              truct_no +
              "%' ORDER BY date_in DESC LIMIT " +
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
        break;
    }
  });
});

// User
// Biểu đồ đường
app.post("/UserDiagramMap", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  function dateType(props) {
    return moment().subtract(props, "days").format("DD/MM");
  }
  var oneDayAgo = dateDefault(1);
  var twoDaysAgo = dateDefault(2);
  var threeDaysAgo = dateDefault(3);
  var fourDaysAgo = dateDefault(4);
  var fiveDaysAgo = dateDefault(5);
  var sixDaysAgo = dateDefault(6);
  var sevenDaysAgo = dateDefault(7);
  // res.json(data);
  var idusergroup = req.body.idusergroup;
  // var idusergroup = 3;
  function sql() {
    //SELECT * FROM `tbweight` WHERE date_in REGEXP '2020-01|2020-02|2020-12'
    return (
      "SELECT price_total, date_in FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
      idusergroup +
      " AND date_in REGEXP '" +
      oneDayAgo +
      "|" +
      twoDaysAgo +
      "|" +
      threeDaysAgo +
      "|" +
      fourDaysAgo +
      "|" +
      fiveDaysAgo +
      "|" +
      sixDaysAgo +
      "|" +
      sevenDaysAgo +
      "'"
    );
  }
  con.connect(async function (err) {
    let data = [
      { title: dateType(7), value: 0 },
      { title: dateType(6), value: 0 },
      { title: dateType(5), value: 0 },
      { title: dateType(4), value: 0 },
      { title: dateType(3), value: 0 },
      { title: dateType(2), value: 0 },
      { title: dateType(1), value: 0 },
    ];
    con.query(sql(), function (err, result) {
      if (err) throw err;
      result.map((l, i) => {
        switch (moment(l.date_in).format("YYYY-MM-DD")) {
          case sevenDaysAgo:
            data[0].value += l.price_total;
            break;
          case sixDaysAgo:
            data[1].value += l.price_total;
            break;
          case fiveDaysAgo:
            data[2].value += l.price_total;
            break;
          case fourDaysAgo:
            data[3].value += l.price_total;
            break;
          case threeDaysAgo:
            data[4].value += l.price_total;
            break;
          case twoDaysAgo:
            data[5].value += l.price_total;
            break;
          case oneDayAgo:
            data[6].value += l.price_total;
            break;
        }
      });
      res.json(data);
    });
  });
});
// Biểu đồ tròn
app.post("/UserDiagramProgress", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  var oneDayAgo = dateDefault(1);
  var twoDaysAgo = dateDefault(2);
  var threeDaysAgo = dateDefault(3);
  var fourDaysAgo = dateDefault(4);
  var fiveDaysAgo = dateDefault(5);
  var sixDaysAgo = dateDefault(6);
  var sevenDaysAgo = dateDefault(7);
  // res.json(data);
  var idusergroup = req.body.idusergroup;
  // var idusergroup = 3;
  function sql(props) {
    //SELECT * FROM `tbweight` WHERE date_in REGEXP '2020-01|2020-02|2020-12'
    return (
      "SELECT " +
      props +
      " FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
      idusergroup +
      " AND date_in REGEXP '" +
      oneDayAgo +
      "|" +
      twoDaysAgo +
      "|" +
      threeDaysAgo +
      "|" +
      fourDaysAgo +
      "|" +
      fiveDaysAgo +
      "|" +
      sixDaysAgo +
      "|" +
      sevenDaysAgo +
      "' ORDER BY date_in DESC"
    );
  }
  con.connect(async function (err) {
    con.query(sql("COUNT(*)"), async function (err, result) {
      let count = await result[0]["COUNT(*)"];
      if (err) throw err;
      con.query(sql("DISTINCT items_name"), function (err, DATA) {
        if (err) throw err;
        let data = DATA.map((l, i) => {
          return { name: l.items_name, val: 0 };
        });
        switch (true) {
          case DATA.length > 0 && DATA.length < 3:
            con.query(sql("items_name"), function (err, check) {
              if (err) throw err;
              data.map((l, i) => {
                check.map((item, index) => {
                  if (l.name == item.items_name) {
                    l.val += 1;
                  }
                });
                l.val = (l.val / count).toFixed(1);
                if (l.name == null) {
                  l.name = "Trống";
                }
              });
              res.json(data);
            });
            break;
          case DATA.length >= 3:
            con.query(sql("items_name"), function (err, check) {
              if (err) throw err;
              var dataAnother = [];
              for (var num = 0; num < 3; num++) {
                if (num == 2) {
                  dataAnother.push({
                    name: "Khác",
                    val: (
                      1 -
                      (parseFloat(data[0].val) + parseFloat(data[1].val))
                    ).toFixed(1),
                  });
                } else {
                  check.map((item, index) => {
                    if (data[num].name == item.items_name) {
                      data[num].val += 1;
                    }
                  });
                  data[num].val = (data[num].val / count).toFixed(1);
                  if (data[num].name == null) {
                    data[num].name = "Trống";
                  }
                  dataAnother.push({
                    name: data[num].name,
                    val: data[num].val,
                  });
                }
              }
              res.json(dataAnother);
            });
            break;
          case DATA.length == 0:
            data.push({
              name: "",
              val: 0,
            });
            res.json(data);
            break;
        }
      });
    });
  });
});

// Get số điện thoại
app.post("/GetNumber", function (req, res) {
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
