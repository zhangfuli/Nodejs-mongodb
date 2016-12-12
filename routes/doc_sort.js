var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    var myDB = db.db('words');
    myDB.collection('word_stats',sortItems);
    setTimeout(function(){
      db.close();
    },3000);
  function displayWords(msg , cursor ,pretty ){
    cursor.toArray(function(err ,itemArr ){
      console.log('\n' + msg);
      var wordList = [];
      for (var i = itemArr.length - 1; i >= 0; i--) {
        wordList.push(itemArr[i].word);
      }
      console.log(JSON.stringify(wordList,null,pretty));
    });
  }
 
  function sortItems(err ,words){
     //升序为1 ，倒叙为 -1
    words.find({'last':'w'},{ sort : [['word' , 1]]} ,function(err ,cursor){
      displayWords('Words ending in w sorted ascending:' ,cursor);
    });//两种方式都可以
    words.find({'last':'w'},{ sort : {word : -1}} ,function(err ,cursor){
      displayWords('Words ending in w sorted descending:' ,cursor);
    });
    words.find({'last':'b'},{ sort :[['size',-1],['last',1]]} ,function(err ,cursor){
      displayWords('B words sorted by size then by last letter:' ,cursor);
    });
    words.find({'last':'b'},{ sort : [['last',1],['size',-1]]} ,function(err ,cursor){
      displayWords('B words sorted by last letter then by size:' ,cursor);
    });

    //查找不同的字段
    words.distinct('size',function(err ,values){
      console.log('\nSizes of words:' + values)
    });
    words.distinct('first' , {'last' : 'u'} ,function(err , values){
      console.log('\nFirst letters of words ending in u:' + values);
    });
    words.distinct('stats.vowels' ,function(err ,values){
      console.log('\nNumbers of vowels in words:' + values);
    });
  }
});

