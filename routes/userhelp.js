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
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": err
        }
      })
      return;
    }
    if(result.length!==0) {
      res.json({
        "meta": {
          "success": true,
          "message": "ok"
        },
        "data": {
          "result": result[0]
        }
      })
    } else if(result.length==0) {
      res.json({
        "meta": {
          "success": true,
          "message": "ok"
        },
        "data": {
          "result": {"totalNum":0}
        }
      })
    }
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
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": error
        }
      })
      return;
    }
    res.json({
      "meta": {
        "success": true,
        "message": "ok"
      },
      "data": {
        "result": oResult
      }
    })
  })
});
router.post('/gethelpdata', function (req, res, next) {
  console.log(req, res)
  var sql = 'SELECT * FROM helppart where inopenid="' + req.body.openid + '"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": err
        }
      })
      return;
    }
    res.json({
      "meta": {
        "success": true,
        "message": "ok"
      },
      "data": {
        "result": result
      }
    })
  })
});
router.post('/updatenum', function (req, res, next) {
  console.log(req.body)
  var sql = 'SELECT * FROM totalnum where openid="' + req.body.openid + '"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": err
        }
      })
      return;
    }
    var addsqlparams = [];
    addsqlparams.push(req.body.totalnum)
    if (result.length !== 0) {
      var modSql = `UPDATE totalnum SET totalNum = ? WHERE openid = '${req.body.openid}'`;
      connection.query(modSql, addsqlparams, function (error, oResult) {
        if (error) {
          res.json({
            "meta": {
              "success": false,
              "message": "请求失败"
            },
            "data": {
              "error": error
            }
          })
          return;
        }
        res.json({
          "meta": {
            "success": true,
            "message": "ok"
          },
          "data": {
            "result": oResult
          }
        })
      })
    } else {
      addsqlparams.push(req.body.openid)
      var addsql = 'INSERT INTO totalnum(totalNum,openid) VALUES(?,?)';
      connection.query(addsql, addsqlparams, function (error, oResult) {
        if (error) {
          res.json({
            "meta": {
              "success": false,
              "message": "请求失败"
            },
            "data": {
              "error": error
            }
          })
          return;
        }
        res.json({
          "meta": {
            "success": true,
            "message": "ok"
          },
          "data": {
            "result": oResult
          }
        })
      })
    }
  })
});
module.exports = router;