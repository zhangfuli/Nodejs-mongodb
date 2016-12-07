var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Databases', function(err, db) {
  if (err) {
    throw err;
  }else{
  	console.log("succeed");
    //列出数据库
    var adminDB = db.admin();
    adminDB.listDatabases(function(err,databases){
      console.log("Before Add Database List:");
      console.log(databases);
    });
    //创建数据库
    var newDB = db.db("newDB");
    newDB.createCollection("newCollection",function(err,collection){
      if(!err){
        console.log("New Database Created");
      }
    });
    //删除数据库
    //db.db("newDB").dropDatabase(function(err,results){})
  }
});

