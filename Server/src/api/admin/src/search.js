var { con } = require("../../../setting_require/require_Modules");

const SearchUsersGroup = async (req, res) => {
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
};

const SearchUsers = async (req, res) => {
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
};

module.exports = {
  SearchUsersGroup,
  SearchUsers,
};
