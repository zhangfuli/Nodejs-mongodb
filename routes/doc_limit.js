var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/' , function (err ,db ){
	if(!err){
		var myDB = db.db('words');
		myDB.collection('word_stats' , limitFind);
		setTimeout(function(){
			myDB.close();
		},3000);
	}
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
	function limitFind(err ,words ){
		words.count({'first' : 'p'},function(err ,count){
			console.log('Count of words statrting with p' + count);
		})
		words.find({'first' : 'p'},function(err ,corsor){
			displayWords('Count of words statrting with p', corsor);
		})
		//限制大小小于6个单词
		words.find({'first' : 'p'},{limit : 5},function(err ,corsor){
			displayWords('Limiting 5 Count of words statrting with p', corsor);
		})
	}
});