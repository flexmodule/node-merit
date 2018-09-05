var express = require('express');
var router = express.Router();
var connection =require("../database.js");
var request = require("request");
var APPID="wx7a4c86d3afffdaf3";
var APPSECRET="3eabf113d9cbeea3f0e63b87c7fb153e";

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.query)
});
router.post('/getadvice', function(req, res, next) {
  console.log(req.body)
  var addsqlparams = [];
  addsqlparams.push(req.body.outopenid)
  addsqlparams.push(req.body.reasons)
  addsqlparams.push(req.body.advice)
  addsqlparams.push(req.body.tel)
  addsqlparams.push(req.body.wechat)
  addsqlparams.push(req.body.qq)
  var addsql = 'INSERT INTO advice(outopenid,reasons,advice,tel,wechat,qq) VALUES(?,?,?,?,?,?)';
  connection.query(addsql, addsqlparams, function (error, oResult) {
    if (error) {
      console.log(error);
      res.send(error);
      return;
    }
    res.send(oResult);
  })
});
module.exports = router;
