var express = require('express');
var app = express();

var util = require('util');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/',function(err ,db ){
	if(!err){
		var myDB = db.db('words');
		myDB.collection('word_stats',function(err ,collection){
			pagedResults(err ,collection , 0 ,10);
		})
	}
	function displayWords(msg , cursor ,pretty){
		cursor.toArray(function(err ,itemArr ){
			console.log('\n' + msg);
			var wordList = [];
			for (var i = itemArr.length - 1; i >= 0; i--) {
				wordList.push(itemArr[i].word);
			}
			console.log(JSON.stringify(wordList,null,pretty));
		});
	}
	function pagedResults(err , words ,startIndex ,pageSize){
		words.find({first : 'v'},{ limit : pageSize,skip : startIndex ,sort : [['word', 1]]},
			function(err ,cursor ){
				cursor.count(true,function(err , cursorCount){
					displayWords('Page Starting at '+ startIndex, cursor);
					if(cursorCount === pageSize){
						pagedResults(err ,words,startIndex+pageSize,pageSize);
					}else{
						myDB.close();
					}
				})
			})
	}
});