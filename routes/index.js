var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");
var APPID = "wx7a4c86d3afffdaf3";
var APPSECRET = "3eabf113d9cbeea3f0e63b87c7fb153e";
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/getopenid', function (req, res, next) {
  console.log(JSON.stringify(req.body))
  request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${req.body.code}&grant_type=authorization_code`, function (error, response, abody) {
    if (!error && response.statusCode == 200) {
      // 请求成功的处理逻辑
      res.send(JSON.parse(abody))
    }
  });
});
module.exports = router;
