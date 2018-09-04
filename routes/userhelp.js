var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/getnum', function(req, res, next) {
  console.log(req.body)
  var sql = 'SELECT * FROM totalnum where openid="'+req.body.openid+'"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result[0])
  })
});
router.post('/gethelp', function(req, res, next) {
  console.log(req.body)
  var addsqlparams = [];
  addsqlparams.push(req.body.inopenid)
  addsqlparams.push(req.body.totalnum)
  addsqlparams.push(req.body.mannum)
  addsqlparams.push(req.body.womannum)
  addsqlparams.push(req.body.message)
  addsqlparams.push(req.body.outopenid)
  var addsql = 'INSERT INTO helppart(inopenid,totalnum,mannum,womannum,message,outopenid) VALUES(?,?,?,?,?,?)';
  connection.query(addsql, addsqlparams, function (error, oResult) {
    if (error) {
      res.send(error);
      return;
    }
    res.send(oResult);
  })
});
module.exports = router;
