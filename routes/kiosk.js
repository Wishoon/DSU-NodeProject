const { render } = require('ejs');
const express = require('express');
var pool = require('../conf/mysql')
var router = express.Router();
// var conn = mysql.connection;

router.get("/",function(req, res){
    var SQL = "SELECT * FROM product WHERE category = ?"
    var allergy = 'select name, seq, category, img, price, detail from product a left join product_allergy c on a.seq = c.product_seq where seq NOT IN (select seq from product a join product_allergy c on a.seq = c.product_seq where c.allergy_seq  IN (select allergy_seq from user_allergy where user_seq = ?)) and category = ? group by seq';

    var allergy2 = 'select seq, name,  category, img, price, detail, main_yn, PRODUCT_seq from product a left join product_allergy c on a.seq = c.product_seq where c.allergy_seq  IN (select allergy_seq from user_allergy where user_seq = ?) and category =? group by seq';
    var param = [1];
    var data = [];
    var sess = req.session;
    console.log(sess.userSeq)
    if(sess.userSeq){
            
        var param1 = [sess.userSeq,1];
        console.log(param1)
        pool.getConnection(function(err, conn){
            conn.query(allergy, param1, function(err, row, filed){
                console.log(row)
                if(row){
                    for(var k = 0 ; k< row.length ; k++){
                        row[k].allergy = 0
                        data.push(row[k])
                    }
                }
                conn.query(allergy2, param1, function(err, row2, filed){
                if(row){
                    for(var i = 0 ; i< row2.length ; i++){
                        row2[i].allergy=1
                        data.push(row2[i])
                    }
                }
                console.log("-----------------------------------------")
                console.log(data);
                
                console.log("-----------------------------------------")
                res.render("user/kiosk", {
                    data: data
                });
                })
            })
        })
    }
    else{
        pool.getConnection(function(err, conn){
            conn.query(SQL, param, function(err, row, filed){
                if(err){
                    console.log(err);
                }else{
                    console.log("상품 조회 성공 하셨습니다.");
                    if(row){
                        res.render("user/kiosk", {
                            data: data
                        });
                    }
                }
            })
        })
    }
   
})

router.get("/order2", function(req, res) {
    
    // var param = [req.session.]
    res.render('user/order',
        {message: "2323"}
    );
})

router.get("/orderEnd", function(req, res) {
    
    // var param = [req.session.]
    res.render('user/orderEnd',
        {message: "2323"}
    );
})


router.get("/category/:category_seq", function(req, res){
    var SQL = "SELECT * FROM product WHERE category = ?"
    var allergy = 'select name, seq, category, img, price, detail from product a left join product_allergy c on a.seq = c.product_seq where seq NOT IN (select seq from product a join product_allergy c on a.seq = c.product_seq where c.allergy_seq  IN (select allergy_seq from user_allergy where user_seq = ?)) and category = ? group by seq';

    var allergy2 = 'select seq, name,  category, img, price, detail, main_yn, PRODUCT_seq from product a left join product_allergy c on a.seq = c.product_seq where c.allergy_seq  IN (select allergy_seq from user_allergy where user_seq = ?) and category =? group by seq';
    var param = [req.params.category_seq];
    var data = [];
    var sess = req.session;
    console.log(sess.userSeq)
    if(sess.userSeq){
            
        var param1 = [sess.userSeq,req.params.category_seq];
        console.log(param1)
        pool.getConnection(function(err, conn){
            conn.query(allergy, param1, function(err, row, filed){
                console.log(row)
                if(row){
                    for(var k = 0 ; k< row.length ; k++){
                        row[k].allergy = 0
                        data.push(row[k])
                    }
                }
                conn.query(allergy2, param1, function(err, row2, filed){
                if(row){
                    for(var i = 0 ; i< row2.length ; i++){
                        row2[i].allergy=1
                        data.push(row2[i])
                    }
                }
                console.log("-----------------------------------------")
                console.log(data);
                
                console.log("-----------------------------------------")
                return res.json(data)
                })
            })
        })
    }
    else{
        pool.getConnection(function(err, conn){
            conn.query(SQL, param, function(err, row, filed){
                if(err){
                    console.log(err);
                }else{
                    console.log("상품 조회 성공 하셨습니다.");
                    if(row){
                        return res.json(row)
                    }
                }
            })
        })
    }
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
router.get("/qrcode/:seq", function(req, res){
    param = req.params.seq;
    sess = req.session;
    console.log("파라메터값",param);
    sess.userSeq = param
    console.log("session값", sess.userSeq);
    res.redirect("/kiosk")
})
module.exports = router;