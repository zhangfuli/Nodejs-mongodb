var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/',function(err, db){
	var myDB = db.db('words');
	myDB.collection('word_stats' ,findItems);
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
		//查询有偶数个字母的单词
		words.find({ size:{$mod :[2,0]}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with even Lengths",cursor);
		});
		//查询字母正好是12个的单词
		words.find({ letters:{$size :12}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with 12 Dis tinct character s:" ,cursor);
		});
		//查询字母以元音开头，以元音结尾
		words.find({ $and:[{ 'first' :{ $in :['a','e','i','o','u']}},
							{ 'last' :{$in : ['a','e','i','o','u']}}]}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with 12 Dis tinct characters:" ,cursor);
		});
		//查询包含超过6个元音的单词
		words.find({ 'stats.vowels':{ $gt : 6}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words containing 7 or more vowels:" ,cursor);
		});
		//查询包含元音的字母
		words.find({ letters:{ $all :['a','e','i','o','u']}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with all 5 vowels:" ,cursor);//查询字母带有非字母字符
		words.find({ 'otherChars':{$exists : true }}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with non-alphabet characters:" ,cursor);
		});
		});
		
		//查询type为other并且chars为2个
		words.find({charsets:{$elemMatch :{$and : [{'type' : 'other'},
													{'chars' : { $size:2 }}]}}}, function(err, cursor){
			if(err) throw err;
			displayWords("Words with 2 non-alphabet characters:" ,cursor);
		});
	}
});