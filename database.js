var mysql = require('mysql'); //调用MySQL模块

//创建一个connection
var connection = mysql.createConnection({
  host: 'localhost', //主机
  user: 'root', //MySQL认证用户名
  password: 'zh12345678', //MySQL认证用户密码
  port: '3306', 
  database: "merit"//端口号
});
//创建一个connection
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect] succeed!');
});
module.exports= connection