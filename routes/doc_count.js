var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/' , function (err ,db ){
	if(!err){
		var myDB = db.db('words');
		myDB.collection('word_stats' , countItems );
		setTimeout(function(){
			myDB.close();
		},3000);
	}
	function countItems (err ,words) {
		words.count({first:{$in : ['a','b','c']}},function(err ,count){
			if(err) throw err;
			console.log("Words starting with a,b,c :" + count);
		})
		
		words.count({ size:{$gt : 12}}, function(err, count){
			if(err) throw err;
			console.log("Words longer than 12 characters:"+ count);
		});

		words.count({ size:{$mod :[2,0]}}, function(err, count){
			if(err) throw err;
			console.log("Words with even Lengths"+ count);
		});

		words.count({ letters:{$size :12}}, function(err, count){
			if(err) throw err;
			console.log("Words with 12 Dis tinct character s:" + count);
		});

		words.count({ $and:[{ 'first' :{ $in :['a','e','i','o','u']}},
							{ 'last' :{$in : ['a','e','i','o','u']}}]}, function(err, count){
			if(err) throw err;
			console.log("Words with 12 Dis tinct characters:" + count);
		});

		words.count({ 'stats.vowels':{ $gt : 6}}, function(err, count){
			if(err) throw err;
			console.log("Words containing 7 or more vowels:" + count);
		});

		words.count({ letters:{ $all :['a','e','i','o','u']}}, function(err, count){
			if(err) throw err;
			console.log("Words with all 5 vowels:" + count);//查询字母带有非字母字符
		words.count({ 'otherChars':{$exists : true }}, function(err, count){
			if(err) throw err;
			console.log("Words with non-alphabet characters:" + count);
		});
		});
		
		words.count({charsets:{$elemMatch :{$and : [{'type' : 'other'},
													{'chars' : { $size:2 }}]}}}, function(err, count){
			if(err) throw err;
			console.log("Words with 2 non-alphabet characters:" + count);
		});
	}
});