var express = require('express');
var router = express.Router();
var connection = require("../database.js");
var request = require("request");
var APPID = "wx7a4c86d3afffdaf3";
var APPSECRET = "3eabf113d9cbeea3f0e63b87c7fb153e";
var fs = require('fs');
var path = require('path');
/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log(req.body)
  request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`, function (error, response, abody) {
    if (!error && response.statusCode == 200) {
      // 请求成功的处理逻辑
      var openid=req.body.path.split("?")[1].split("=")[1];
      new Promise(function (resolve, reject) {	//由于request pipe是异步下载图片的，需要同步的话需添加一个promise
        var timestamp=new Date().getTime();
        var stream = request({
              url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${JSON.parse(abody).access_token}`,
              method: "POST",
              body: JSON.stringify(req.body)
              }).pipe(fs.createWriteStream(path.resolve(__dirname,`../public/images/${openid+timestamp}.png`)));
        stream.on('finish', function () {
          var data= {
            "meta": {
              "success": true,
              "message": "ok"
            },
            "data": {
              imgurl: `http://localhost:3000/images/${openid+timestamp}.png`
            }
          }
          resolve(data)
        });
    }).then(data=>{
      res.send(data)
    });  
    } else {
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": error
        }
      })
    }
  });
});
router.post('/qrcodeindex', function (req, res, next) {
  console.log(JSON.stringify(req.body))
  request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`, function (error, response, abody) {
    if (!error && response.statusCode == 200) {
      // 请求成功的处理逻辑
      var openid=req.body.path.split("?")[1].split("=")[1];
      new Promise(function (resolve, reject) {	//由于request pipe是异步下载图片的，需要同步的话需添加一个promise
        var timestamp=new Date().getTime();
        var stream = request({
              url: `https://api.weixin.qq.com/wxa/getwxacode?access_token=${JSON.parse(abody).access_token}`,
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(req.body)
              }).pipe(fs.createWriteStream(path.resolve(__dirname,`../public/images/${openid+timestamp}.png`)));
        stream.on('finish', function () {
          var data= {
            "meta": {
              "success": true,
              "message": "ok"
            },
            "data": {
              imgurl: `http://localhost:3000/images/${openid+timestamp}.png`
            }
          }
          resolve(data)
        });
    }).then(data=>{
      res.send(data)
    });  
    } else {
      res.json({
        "meta": {
          "success": false,
          "message": "请求失败"
        },
        "data": {
          "error": error
        }
      })
    }
  });
});
module.exports = router;