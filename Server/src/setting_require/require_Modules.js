var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var md5 = require("md5");
var moment = require("moment");

var con = mysql.createConnection({
  host: "localhost",
  user: "can15657_canquochung",
  password: "@Quochung1234",
  database: "can15657_canquochung",
});

module.exports = { router, con, md5, moment };
