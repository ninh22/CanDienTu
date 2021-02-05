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

// Import API
var { admin, users, account, weight, home } = require("./src/api/index");

// Home
app.use("/Home", home);
// Weight
app.use("/Weight", weight);
// Account
app.use("/Account", account);
// Admin
app.use("/Admin", admin);
// User
app.use("/Users", users);
