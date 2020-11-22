var express = require('express');
var router = express.Router();
var mysql = require('mysql');
 
 
var connection = mysql.createPool({
        host    :'localhost',
        port : 3306,
        user : 'root',
        password : '1111',
        database:'allergy3'
});
 
// connection.connect(function(err) {
//   if (err) {
//       res.render('mysql', { connect: '연결 실패',err:err });
//       console.error(err);
//       throw err;
//   }else{
//       res.render('mysql', { connect: '연결 성공',err:'없음' });
//   }
//   console.log(results);
// });

// connection.end();

module.exports = connection;