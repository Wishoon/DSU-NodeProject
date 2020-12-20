var express = require('express');
var pool = require('../conf/mysql')
var router = express.Router();

router.get('/', function(rea, res) {
  res.send("admin main page");  
})
router.get('/', function(rea, res) {
  res.send("admin main page");  
})
router.get("/products", function(req, res) {
    res.render('admin/products',
        {message: "hellos, ejs"}
    );
})
router.get("/order", function(req, res) {

//   var orderStateSQL = "SELECT * FROM orders a, orders_info b, product c WHERE a.seq = b.orders_seq AND b.product_seq = c.seq"
//   // let param = [id, pw];
//   pool.getConnection(function(err, conn){
//     conn.query(orderStateSQL, function(err, row){
//         if(err){
//             console.log(err);
//         }else{
//             if(row[0]){
//                 console.log("데이터 가져오기 성공")
//                 console.log(data);
//             }else{
//                 console.log("아이디 및 비밀번호가 틀렸습니다.")
//             }
//         }
//     })
// })
res.render('admin/orderState',
      // {data: row}
  );
})

module.exports = router;