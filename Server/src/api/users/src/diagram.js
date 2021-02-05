var { con, moment } = require("../../../setting_require/require_Modules");

const UserDiagramMap = async (req, res) => {
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
      "SELECT price_total, date_in FROM `tbweight` WHERE enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
};

const UserDiagramProgress = async (req, res) => {
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
      " FROM `tbweight` WHERE enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
};

module.exports = {
  UserDiagramMap,
  UserDiagramProgress,
};
