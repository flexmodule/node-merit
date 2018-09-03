var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");
var APPID = "wx7a4c86d3afffdaf3";
var APPSECRET = "3eabf113d9cbeea3f0e63b87c7fb153e";
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.post('/getopenid', function (req, res, next) {
  request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${req.body.code}&grant_type=authorization_code`, function (error, response, abody) {
    if (!error && response.statusCode == 200) {
      // 请求成功的处理逻辑
      res.send(JSON.parse(abody))
    }
  });
});
router.post('/userinfo', function (req, res, next) {
  var addsqlparams = [];
  addsqlparams.push(req.body.openid)
  addsqlparams.push(req.body.nickName)
  addsqlparams.push(req.body.avatarUrl)
  addsqlparams.push(req.body.province)
  addsqlparams.push(req.body.city)
  var addsql = 'INSERT INTO user(openid,nickname,avatarurl,province,city) VALUES(?,?,?,?,?)';
  var sql = 'SELECT * FROM user where openid="'+req.body.openid+'"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    console.log(result)
    if (result.length != 0) {
      res.send("已经授权加入数据库")
    } else {
      connection.query(addsql, addsqlparams, function (error, oResult) {
        if (error) {
          console.log(error);
          return;
        }
        res.send(oResult);
        connection.end();
      })
    }
  })
});
router.post('/queryuserinfo', function (req, res, next) {
  var sql = 'SELECT * FROM user where openid="'+req.body.openid+'"';
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(result[0])
  })
});
module.exports = router;