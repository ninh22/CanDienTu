var { router, con, moment } = require("../setting_require/require_Modules");

// Check loại users
router.post("/WeightAppType", async function (req, res) {
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
});

router.post("/UserOverview", async function (req, res) {
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
          "SELECT price_total, weight_2 FROM `tbweight` WHERE enable = 1 AND idusergroup = " +
            idusergroup +
            " AND date_in LIKE '%" +
            date_in +
            "%'",
          async function (err, result) {
            if (err) throw err;
            let data = { countResult: 0, money: 0, weight: 0 };
            await result.map((l, i) => {
              data.money += l.price_total;
              data.weight += l.weight_2;
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

// Biểu đồ đường
router.post("/UserDiagramMap", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  function dateType(props) {
    return moment().subtract(props, "days").format("DD/MM");
  }
  var oneDayAgo = dateDefault(0);
  var twoDaysAgo = dateDefault(1);
  var threeDaysAgo = dateDefault(2);
  var fourDaysAgo = dateDefault(3);
  var fiveDaysAgo = dateDefault(4);
  var sixDaysAgo = dateDefault(5);
  var sevenDaysAgo = dateDefault(6);
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
      { title: dateType(6), value: 0 },
      { title: dateType(5), value: 0 },
      { title: dateType(4), value: 0 },
      { title: dateType(3), value: 0 },
      { title: dateType(2), value: 0 },
      { title: dateType(1), value: 0 },
      { title: dateType(0), value: 0 },
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
router.post("/UserDiagramProgress", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  var oneDayAgo = dateDefault(0);
  var twoDaysAgo = dateDefault(1);
  var threeDaysAgo = dateDefault(2);
  var fourDaysAgo = dateDefault(3);
  var fiveDaysAgo = dateDefault(4);
  var sixDaysAgo = dateDefault(5);
  var sevenDaysAgo = dateDefault(6);
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
// Biểu đồ đường tìm kiếm
router.post("/SearchDiagramMap", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  function monthType(props) {
    return moment().subtract(props, "months").format("YYYY-MM");
  }
  function dateType(props) {
    return moment().subtract(props, "days").format("DD/MM");
  }
  // Days
  var oneDayAgo = dateDefault(0);
  var twoDaysAgo = dateDefault(1);
  var threeDaysAgo = dateDefault(2);
  var fourDaysAgo = dateDefault(3);
  var fiveDaysAgo = dateDefault(4);
  var sixDaysAgo = dateDefault(5);
  var sevenDaysAgo = dateDefault(6);
  // Months
  var oneMonthAgo = monthType(0);
  var twoMonthsAgo = monthType(1);
  var threeMonthsAgo = monthType(2);
  var fourMonthsAgo = monthType(3);
  var fiveMonthsAgo = monthType(4);
  var sixMonthsAgo = monthType(5);
  var sevenMonthsAgo = monthType(6);
  var eightMonthAgo = monthType(7);
  var nineMonthsAgo = monthType(8);
  var tenMonthsAgo = monthType(9);
  var eleventMonthsAgo = monthType(10);
  var twelveMonthsAgo = monthType(11);
  // res.json(data);
  var idusergroup = req.body.idusergroup;
  var type = req.body.type;
  var truct_no = req.body.truct_no;
  // var idusergroup = 3;
  // var type = 'Days';
  // var truct_no = '11';
  function sql(props) {
    //SELECT * FROM `tbweight` WHERE date_in REGEXP '2020-01|2020-02|2020-12'
    switch (props) {
      case "Days":
        return (
          "SELECT price_total, date_in FROM `tbweight` WHERE truct_no LIKE '%" +
          truct_no +
          "%' AND enable = 1 AND idusergroup = " +
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
      case "Months":
        return (
          "SELECT price_total, date_in FROM `tbweight` WHERE truct_no LIKE '%" +
          truct_no +
          "%' AND enable = 1 AND idusergroup = " +
          idusergroup +
          " AND date_in REGEXP '" +
          oneMonthAgo +
          "|" +
          twoMonthsAgo +
          "|" +
          threeMonthsAgo +
          "|" +
          fourMonthsAgo +
          "|" +
          fiveMonthsAgo +
          "|" +
          sixMonthsAgo +
          "|" +
          sevenMonthsAgo +
          "|" +
          eightMonthAgo +
          "|" +
          nineMonthsAgo +
          "|" +
          tenMonthsAgo +
          "|" +
          eleventMonthsAgo +
          "|" +
          twelveMonthsAgo +
          "'"
        );
    }
  }
  con.connect(async function (err) {
    switch (type) {
      case "Days":
        const date = [
          { val: dateType(6) },
          { val: dateType(5) },
          { val: dateType(4) },
          { val: dateType(3) },
          { val: dateType(2) },
          { val: dateType(1) },
          { val: dateType(0) },
        ];
        let dataD = date.map((l, i) => {
          return { date: l.val, value: [{ name: 0, data: 0 }] };
        });
        con.query(sql("Days"), function (err, result) {
          if (err) throw err;
          result.map((l, i) => {
            switch (moment(l.date_in).format("YYYY-MM-DD")) {
              case sevenDaysAgo:
                dataD[0].value[0].data += l.price_total;
                dataD[0].value[0].name += 1;
                break;
              case sixDaysAgo:
                dataD[1].value[0].data += l.price_total;
                dataD[1].value[0].name += 1;
                break;
              case fiveDaysAgo:
                dataD[2].value[0].data += l.price_total;
                dataD[2].value[0].name += 1;
                break;
              case fourDaysAgo:
                dataD[3].value[0].data += l.price_total;
                dataD[3].value[0].name += 1;
                break;
              case threeDaysAgo:
                dataD[4].value[0].data += l.price_total;
                dataD[4].value[0].name += 1;
                break;
              case twoDaysAgo:
                dataD[5].value[0].data += l.price_total;
                dataD[5].value[0].name += 1;
                break;
              case oneDayAgo:
                dataD[6].value[0].data += l.price_total;
                dataD[6].value[0].name += 1;
                break;
            }
          });
          let reverse = dataD.reverse();
          res.json(reverse);
        });
        break;
      case "Months":
        const months = [
          { val: twelveMonthsAgo },
          { val: eleventMonthsAgo },
          { val: tenMonthsAgo },
          { val: nineMonthsAgo },
          { val: eightMonthAgo },
          { val: sevenMonthsAgo },
          { val: sixMonthsAgo },
          { val: fiveMonthsAgo },
          { val: fourMonthsAgo },
          { val: threeMonthsAgo },
          { val: twoMonthsAgo },
          { val: oneMonthAgo },
        ];
        let dataM = months.map((l, i) => {
          return { date: l.val, value: [{ name: 0, data: 0 }] };
        });
        con.query(sql("Months"), function (err, result) {
          if (err) throw err;
          result.map((l, i) => {
            switch (moment(l.date_in).format("YYYY-MM")) {
              case twelveMonthsAgo:
                dataM[0].value[0].data += l.price_total;
                dataM[0].value[0].name += 1;
                break;
              case eleventMonthsAgo:
                dataM[1].value[0].data += l.price_total;
                dataM[1].value[0].name += 1;
                break;
              case tenMonthsAgo:
                dataM[2].value[0].data += l.price_total;
                dataM[2].value[0].name += 1;
                break;
              case nineMonthsAgo:
                dataM[3].value[0].data += l.price_total;
                dataM[3].value[0].name += 1;
                break;
              case eightMonthAgo:
                dataM[4].value[0].data += l.price_total;
                dataM[4].value[0].name += 1;
                break;
              case sevenMonthsAgo:
                dataM[5].value[0].data += l.price_total;
                dataM[5].value[0].name += 1;
                break;
              case sixMonthsAgo:
                dataM[6].value[0].data += l.price_total;
                dataM[6].value[0].name += 1;
                break;
              case fiveMonthsAgo:
                dataM[7].value[0].data += l.price_total;
                dataM[7].value[0].name += 1;
                break;
              case fourMonthsAgo:
                dataM[8].value[0].data += l.price_total;
                dataM[8].value[0].name += 1;
                break;
              case threeMonthsAgo:
                dataM[9].value[0].data += l.price_total;
                dataM[9].value[0].name += 1;
                break;
              case twoMonthsAgo:
                dataM[10].value[0].data += l.price_total;
                dataM[10].value[0].name += 1;
                break;
              case oneMonthAgo:
                dataM[11].value[0].data += l.price_total;
                dataM[11].value[0].name += 1;
                break;
            }
          });
          let reverse = dataM.reverse();
          res.json(reverse);
        });
        break;
    }
  });
});
// Biểu đồ tròn tìm kiếm
router.post("/SearchDiagramProgress", async function (req, res) {
  function dateDefault(props) {
    return moment().subtract(props, "days").format("YYYY-MM-DD");
  }
  function monthType(props) {
    return moment().subtract(props, "months").format("YYYY-MM");
  }
  function dateType(props) {
    return moment().subtract(props, "days").format("DD/MM");
  }
  // Days
  var currentDay = dateDefault(0);
  var oneDayAgo = dateDefault(1);
  var twoDaysAgo = dateDefault(2);
  var threeDaysAgo = dateDefault(3);
  var fourDaysAgo = dateDefault(4);
  var fiveDaysAgo = dateDefault(5);
  var sixDaysAgo = dateDefault(6);

  // Months
  var currentMonth = monthType(0);
  var oneMonthAgo = monthType(1);
  var twoMonthsAgo = monthType(2);
  var threeMonthsAgo = monthType(3);
  var fourMonthsAgo = monthType(4);
  var fiveMonthsAgo = monthType(5);
  var sixMonthsAgo = monthType(6);
  var sevenMonthsAgo = monthType(7);
  var eightMonthAgo = monthType(8);
  var nineMonthsAgo = monthType(9);
  var tenMonthsAgo = monthType(10);
  var eleventMonthsAgo = monthType(11);

  // res.json(data);
  var idusergroup = req.body.idusergroup;
  var type = req.body.type;
  var truct_no = req.body.truct_no;
  // var idusergroup = 3;
  // var type = "Days";
  // var truct_no = "";
  function sql(props) {
    //SELECT * FROM `tbweight` WHERE date_in REGEXP '2020-01|2020-02|2020-12'
    switch (props) {
      case "Days":
        return (
          "SELECT items_name, weight_2, date_in FROM `tbweight` WHERE truct_no LIKE '%" +
          truct_no +
          "%' AND enable = 1 AND idusergroup = " +
          idusergroup +
          " AND date_in REGEXP '" +
          currentDay +
          "|" +
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
          "'"
        );
      case "Months":
        return (
          "SELECT items_name, weight_2, date_in FROM `tbweight` WHERE truct_no LIKE '%" +
          truct_no +
          "%' AND enable = 1 AND idusergroup = " +
          idusergroup +
          " AND date_in REGEXP '" +
          currentMonth +
          "|" +
          oneMonthAgo +
          "|" +
          twoMonthsAgo +
          "|" +
          threeMonthsAgo +
          "|" +
          fourMonthsAgo +
          "|" +
          fiveMonthsAgo +
          "|" +
          sixMonthsAgo +
          "|" +
          sevenMonthsAgo +
          "|" +
          eightMonthAgo +
          "|" +
          nineMonthsAgo +
          "|" +
          tenMonthsAgo +
          "|" +
          eleventMonthsAgo +
          "'"
        );
    }
  }
  con.connect(async function (err) {
    function checkData(source, number, name, data) {
      if (source[number].value == "") {
        source[number].value.push({ name: name, data: data });
      } else {
        let check = false;
        source[number].value.map((l, i) => {
          if (name == l.name) {
            l.data += data;
            check = true;
          }
        });
        if (check == false) {
          source[number].value.push({ name: name, data: data });
        }
      }
    }
    switch (type) {
      case "Days":
        const date = [
          { val: dateType(6) },
          { val: dateType(5) },
          { val: dateType(4) },
          { val: dateType(3) },
          { val: dateType(2) },
          { val: dateType(1) },
          { val: dateType(0) },
        ];
        let dataD = date.map((l, i) => {
          return { date: l.val, value: [] };
        });
        con.query(sql("Days"), function (err, result) {
          if (err) throw err;
          result.map((l, i) => {
            switch (moment(l.date_in).format("YYYY-MM-DD")) {
              case sixDaysAgo:
                checkData(dataD, 0, l.items_name, l.weight_2);
                break;
              case fiveDaysAgo:
                checkData(dataD, 1, l.items_name, l.weight_2);
                break;
              case fourDaysAgo:
                checkData(dataD, 2, l.items_name, l.weight_2);
                break;
              case threeDaysAgo:
                checkData(dataD, 3, l.items_name, l.weight_2);
                break;
              case twoDaysAgo:
                checkData(dataD, 4, l.items_name, l.weight_2);
                break;
              case oneDayAgo:
                checkData(dataD, 5, l.items_name, l.weight_2);
                break;
              case currentDay:
                checkData(dataD, 6, l.items_name, l.weight_2);
                break;
            }
          });
          let reverse = dataD.reverse();
          res.json(reverse);
        });
        break;
      case "Months":
        const months = [
          { val: eleventMonthsAgo },
          { val: tenMonthsAgo },
          { val: nineMonthsAgo },
          { val: eightMonthAgo },
          { val: sevenMonthsAgo },
          { val: sixMonthsAgo },
          { val: fiveMonthsAgo },
          { val: fourMonthsAgo },
          { val: threeMonthsAgo },
          { val: twoMonthsAgo },
          { val: oneMonthAgo },
          { val: currentMonth },
        ];
        let dataM = months.map((l, i) => {
          return { date: l.val, value: [] };
        });
        con.query(sql("Months"), function (err, result) {
          if (err) throw err;
          result.map((l, i) => {
            switch (moment(l.date_in).format("YYYY-MM")) {
              case eleventMonthsAgo:
                checkData(dataM, 0, l.items_name, l.weight_2);
                break;
              case tenMonthsAgo:
                checkData(dataM, 1, l.items_name, l.weight_2);
                break;
              case nineMonthsAgo:
                checkData(dataM, 2, l.items_name, l.weight_2);
                break;
              case eightMonthAgo:
                checkData(dataM, 3, l.items_name, l.weight_2);
                break;
              case sevenMonthsAgo:
                checkData(dataM, 4, l.items_name, l.weight_2);
                break;
              case sixMonthsAgo:
                checkData(dataM, 5, l.items_name, l.weight_2);
                break;
              case fiveMonthsAgo:
                checkData(dataM, 6, l.items_name, l.weight_2);
                break;
              case fourMonthsAgo:
                checkData(dataM, 7, l.items_name, l.weight_2);
                break;
              case threeMonthsAgo:
                checkData(dataM, 8, l.items_name, l.weight_2);
                break;
              case twoMonthsAgo:
                checkData(dataM, 9, l.items_name, l.weight_2);
                break;
              case oneMonthAgo:
                checkData(dataM, 10, l.items_name, l.weight_2);
                break;
              case currentMonth:
                checkData(dataM, 11, l.items_name, l.weight_2);
                break;
            }
          });
          let reverse = dataM.reverse();
          res.json(reverse);
        });
        break;
    }
  });
});

module.exports = router;
