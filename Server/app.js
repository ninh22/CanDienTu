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
var api = require("./src/api");

// API
app.use(api);
