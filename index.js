var express = require("express");
var app = express();
var path = require('path')
// a0e78d3b449db7059df0a38abd3952f8

// setting up view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/',require('./route/index'))


app.listen(3000);
