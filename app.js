var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var ejs = require('ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function  (req,res) {
  res.sendFile(__dirname+'/public/index.html');
})
app.get('/admin',function  (req,res) {
  res.sendFile(__dirname+'/public/admin.html');
})
http.listen(5000,function(){
  console.log("Server starting ");
})

