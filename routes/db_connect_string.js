var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Databases', function(err, db) {
  if (err) {
    throw err;
  }else{
  	console.log("succeed");
  }
  // db.collection('mammals').find().toArray(function(err, result) {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(result);
  // });
});


