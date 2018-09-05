var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/getnum', function (req, res, next) {
  console.log(req.body)
  var sql = 'SELECT * FROM totalnum where openid="' + req.body.openid + '"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result)
  })
});
router.post('/gethelp', function (req, res, next) {
  console.log(req.body)
  var addsqlparams = [];
  addsqlparams.push(req.body.inopenid)
  addsqlparams.push(req.body.totalnum)
  addsqlparams.push(req.body.message)
  addsqlparams.push(req.body.outopenid)
  var addsql = 'INSERT INTO helppart(inopenid,totalnum,message,outopenid) VALUES(?,?,?,?)';
  connection.query(addsql, addsqlparams, function (error, oResult) {
    if (error) {
      res.send(error);
      return;
    }
    res.send(oResult);
  })
});
router.post('/gethelpdata', function (req, res, next) {
  console.log(req.body)
  var sql = 'SELECT * FROM helppart where inopenid="' + req.body.openid + '"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(result)
    res.send(result)
  })
});
router.post('/updatenum', function (req, res, next) {
  console.log(req.body)
  var sql = 'SELECT * FROM totalnum where openid="' + req.body.openid + '"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    var addsqlparams = [];
    addsqlparams.push(req.body.totalnum)
    addsqlparams.push(req.body.man)
    addsqlparams.push(req.body.woman)
    if (result.length != 0) {
      var modSql = `UPDATE totalnum SET totalNum = ?,man = ?,woman = ? WHERE openid = ${req.body.openid}`;
      connection.query(modSql, addsqlparams, function (error, oResult) {
        if (error) {
          res.send(error);
          return;
        }
        res.send(oResult);
      })
    } else {
      addsqlparams.push(req.body.openid)
      var addsql = 'INSERT INTO totalnum(openid,totalNum,man,woman) VALUES(?,?,?,?)';
      connection.query(addsql, addsqlparams, function (error, oResult) {
        if (error) {
          console.log(error);
          return;
        }
        res.send(oResult);
      })
    }
  })

});
module.exports = router;