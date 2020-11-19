const express = require('express');
const session = require('express-session');
const FileStore = require("session-file-store")(session);
const { connect } = require('mongoose');
var pool = require('../conf/mysql')
var router = express.Router();
// var conn = mysql.connection;


router.get('/login', function(req, res) {
    var LoginSQL = "SELECT * FROM USERS WHERE id = ? AND password = ?"
    
    let body = req.query;
    let id = body.id;
    let pw = body.password;
    let param = [id, pw];
    console.log(body)
    console.log(id +"s           ssss" + pw)
    pool.getConnection(function(err, conn){
        conn.query(LoginSQL, param, function(err, row, filed){
            
            if(err){
                console.log(err);
            }else{
                if(row){
                    console.log(row[0].id)
                    console.log(req.session)
                    loginId = row[0].id;
                    loginSeq = row[0].seq;
                    req.session.seq = loginSeq
                }else{
                    
                }

            }
        })
    })

    res.send("admin main page");  
})
router.get("/logout", function(req, res) {
    if(req.session.id){
        req.session.destroy(
            function(err){
                if(err){
                    console.log("세션 삭제시 에러");
                    return;
                }
                console.log('세션 삭제 성공');
            }
        );
    } else {
        console.log("로그인이 안됨");

    }
    res.render('admin/products',
        {message: "hellos, ejs"}
    );
})
router.post("/sign", function(req, res){
    var UserSelect = "SELECT seq FROM USERS WHERE id = ?"
    var UserInsert = "INSERT USERS(id, password, name, phone, birth) values(?, ?, ?, ?, ?)"
    var AllergyInsert = "INSERT USER_ALLERGY(USERS_seq, ALLERGY_seq) values(?, ?)"
    let body = req.query;
    let id = body.id;
    let pw = body.password;
    let nm = body.name;
    let phone = body.phone;
    let birth = body.birth;
    let allergy =body.allergy;
    var UserInsertParam = [id, pw, nm, phone, birth];
    var UserSelectParam = [id];
    console.log(req);
    console.log("여기를 확인해주세요 !");
    console.log(body);
    pool.getConnection(function(err, conn){
        conn.query(UserInsert, UserInsertParam, function(err, row){
            if(err){
                console.log(err);
            }else{
                console.log("유저 정보 삽입 성공하셨습니다.");
                conn.query(UserSelect, UserSelectParam, function(err,rows,filed){
                    if(err){
                        console.log(err);
                    }else{

                        console.log(filed)
                        console.log(rows[0].seq)
                        let data = rows[0].seq
                        console.log("유저번호 검색 성공하셨습니다.");
                        console.log(allergy);
                        allergy.forEach(function(element){
                            conn.query(AllergyInsert, [data,element], function(err,row){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("알레지 번호:"+ element + "성공하셨습니다.")
                                }
                            })
                        })
                    }
                })
            }
        })
    })

    // conn.query(UserSelect, UserSelectParam, function(err, results, filed){
    //     res.render('유저조회 성공하셨습니다. 시퀀스를 들고옵니다.');
    // })


})
router.get("/", function(req, res){
    let body = req.body
    let seq = req.session.req;
    let url = "/allergy"+seq;
    console.log(url);
})
router.get("/test" , function(req,res){
var sql = 'SELECT * FROM USERS WHERE id = ?'

    pool.getConnection(function(err , conn){
        conn.query(sql, [2],function(err ,row){
            if(err){
                console.log(err)
            }else{
                if(row)
                console.log(row)
                // res.send({success: "ddddd"})
         res.render('admin/products',console.log("hello"),
            {message: "hellos, ejs"}
    );

            }
        })
    })

    // conn.query("SELECT * FROM USERS", function(err, results, filed){
    //     res.render("hello");    
    //     console.log(err);
    //     console.log(results);
    //     console.log(filed);
    // })
})
module.exports = router;