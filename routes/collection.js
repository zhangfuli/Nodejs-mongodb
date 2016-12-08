var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/Databases',function(err, db){
	if(err){
		throw err;
	}else{
		function addObject(collection , object){
			collection.insert(object ,function(err,result){
				if(!err){
					console.log('Inserted : ');
					console.log(result);
				}
			})
		};
		var newDB = db.db('newDB');
		newDB.createCollection("nebulae",function(err ,nebulae){
			addObject(nebulae , { name : "123",age:5 });
		});
		newDB.createCollection("nebulae",function(err ,nebulae){
			addObject(nebulae , { name : "456",age:6 });
		})
	}
});