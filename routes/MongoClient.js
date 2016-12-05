var MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;
var client = new MongoClient(new Server('localhost',27017,{
				socketOptions : { connectTimeoutMS:500},
				poolSize : 5,
				auto_reconnect : true
			},{
				numberOfRetries : 3,
				retryMillisSeconds : 500
			}));
client.open(function(err,client){
	if(err){
		console.log("Connect Failed Via Client Object.");
	}else{
		var db = client.db("test");
		if(db){
			console.log("Connected Via Client Object...");
			db.authenticate("dbadmin","test",function(err ,results){
				if(err){
					console.log("Authentication failed...");
					client.close();
					console.log("Conection closed...");
				}else{
					console.log("Authenticated Via Client Object...");
					db.logout(function(err,result){
						if(!err){
							console.log("Logged out Via Client Object...");
						}
						client.close();
						console.log("Connected closed...");
					});
				}
			});
		}
	}
});
