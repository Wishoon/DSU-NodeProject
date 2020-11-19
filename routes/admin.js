var express = require('express');

var router = express.Router();

router.get('/', function(rea, res) {
  res.send("admin main page");  
})
router.get("/products", function(req, res) {
    res.render('admin/products',
        {message: "hellos, ejs"}
    );
})

module.exports = router;