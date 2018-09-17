var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");
var APPID = "wx7a4c86d3afffdaf3";
var APPSECRET = "3eabf113d9cbeea3f0e63b87c7fb153e";
var fs = require('fs');
var path = require('path');
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query)
  request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`, function (error, response, abody) {
    if (!error && response.statusCode == 200) {
      // 请求成功的处理逻辑
      console.log(JSON.stringify(req.query))
      request({
        url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${JSON.parse(abody).access_token}`,
        method: "POST",
        body: JSON.stringify(req.query)
      }, function (error, response, oBody) {
        if (!error && response.statusCode == 200) {
          fs.writeFile(path.resolve(__dirname, '../public/images/mess.png'), oBody, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
          });
          // oBody.pipe(fs.createWriteStream('../public/images/a.png'));
          // console.log(oBody)
          res.send(oBody);
        }
      });
    }
  });
});

module.exports = router;