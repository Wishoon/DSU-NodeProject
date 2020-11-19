var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  database : 'allergy'
});

connection.connect();

connection.query('SELECT * FROM 테이블 명', function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end();