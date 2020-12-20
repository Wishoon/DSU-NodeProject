const { render } = require('ejs');
const express = require('express');
var pool = require('../conf/mysql')
var router = express.Router();
// var conn = mysql.connection;

router.get("/kiosk",function(req, res){
    var MenuSQL = "SELECT * FROM product"
    pool.getConnection(function(err, conn){
        conn.query(MenuSQL, function(err, row, filed){
            console.log(row)
            res.render("user/kiosk", {
                data: row
            });
            if(err){
                console.log(err);
            }
        })
    })
})

router.get("/order2", function(req, res) {
    
    // var param = [req.session.]
    res.render('user/order',
        {message: "2323"}
    );
})

router.get("/", function(req, res){
    var SQL = "SELECT * FROM PRODUCT WHERE COMPANY_seq = ?"
    var param = [req.session.seq];
    var data;
    pool.getConnection(function(err, conn){
        conn.query(SQL, param, function(err, row, filed){
            if(err){
                console.log(err);
            }else{
                console.log("상품 조회 성공 하셨습니다.");
                if(row){
                    data = row;
                    console.log(data)
                }else{
                    
                }

            }
        })
    })
    res.render('admin/jsQR.ejs/',
        {message: ""}
    );
})

router.get("/category/:name", function(req, res){
    var SQL = "SELECT * FROM PRODUCT WHERE COMPANY_seq = ? and category = ?"
    var param = [req.session.CompanySeq, req.params.name];
    var data;
    pool.getConnection(function(err, conn){
        conn.query(SQL, param, function(err, row, filed){
            if(err){
                console.log(err);
            }else{
                console.log("상품 조회 성공 하셨습니다.");
                if(row){
                    data = row;
                    console.log(data)
                }else{
                    
                }

            }
        })
    })
    res.send("good")
})

router.post("/order", function(req, res){
    var OrderSQL = "INSERT ORDERS(Allprice) values (?)"
    var OrderSelectSQL = "SELECT max(seq)as seq FROM ORDERS"
    var OrderInsertSQL = "INSERT ORDERS_INFO(ORDERS_seq,PRODUCT_seq, COUNT) value(?,?,?)"

    let body = req.query;
    let price = body.price;
    let count = body.count;
    let seq = body.seq; 
    let Allprice = 0;

    price.forEach(function(price){
        Allprice = Allprice + parseInt(price)
    })
    console.log(Allprice)
    param = [Allprice]
    pool.getConnection(function(err, conn){
        conn.query(OrderSQL, param, function(err, row){
            if(err){
                console.log(err);
            }else{
                console.log("주문 번호 생성 완료 했습니다 번호를 조회합니다.");
                conn.query(OrderSelectSQL, function(err, row){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("주문 번호 조회 했습니다 주문 상세 정보를 입력합니다")
                        for(var i = 0 ; i < count.length; i++){
                            var param2 = [row[0].seq, seq[i], count[i]]
                            conn.query(OrderInsertSQL, param2, function(err, row){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("주문 상세 정보를 입력 완료 했습니다")
                                }
                            })
                        }
                    }
                })
            }
        })
    })
    res.send("성공")
    
})

module.exports = router;