var { con } = require("../../../setting_require/require_Modules");

const UserOverview = async (req, res) => {
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
          "SELECT price_total, weight_2 FROM `tbweight` WHERE enable = 1 AND NOT notes LIKE '%phieu sai%' AND idusergroup = " +
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
};

module.exports = {
  UserOverview,
};
