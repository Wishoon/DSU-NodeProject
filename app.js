var express = require('express');
var bodyParser = require('body-parser');
var path = require('path')

var app = express();
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({exrended: true}));

// var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
// var db = mongoose.connection;
// db.on('error', console.error);
// db.once('open', function() {
//     console.log('mongo db Connection');
// });

// var connect = mongoose.connect('mongodb://127.0.0.1:27017/myDbName', {useMongoClient: true});
// autoIncrement.initialize(connect);

var admin = require("./routes/admin");

app.get('/', function(req, res) {
    res.send('first App');
});

// routes add
app.use('/admin', admin);

app.listen(port, function() {
    console.log('Express listening on port : ', port);
})