var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/',function(err, db){
	var myDB = db.db('words');
	myDB.collection('word_stats' , findItems);
	setTimeout(function(){
		db.close();
	},3000);
	function displayWords(msg ,cursor ,pretty ){
		cursor.toArray(function(err,itemArr){
			console.log('\n' + msg);
			var wordList = [];
			for(var i=0;i<itemArr.length;i++){
				wordList.push(itemArr[i].word);
			}
			console.log(JSON.stringify(wordList ,null, pretty));
		});
	}
	function findItems (err ,words){
		//查询以a、b、c开头的单词
		words.find({first:{$in : ['a','b','c']}},function(err , cursor){
			if(err) throw err;
			displayWords("Words starting with a,b,c :" ,cursor);
		});
		//查询长度超过12个字符的单词
		words.find({ size:{$gt : 12}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words longer than 12 characters:",cursor);
		});
	}
});