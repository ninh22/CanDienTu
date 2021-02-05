var { con, moment } = require("../../../setting_require/require_Modules");

const SearchDiagramMap = async (req, res) => {
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
          "%' AND enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
          "%' AND enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
};

const SearchDiagramProgress = async (req, res) => {
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
          "%' AND enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
          "%' AND enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
};

module.exports = {
  SearchDiagramMap,
  SearchDiagramProgress,
};
