const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const config = require('../config/database')
url = 'mongodb://localhost:27017/';


const transaction = mongoose.Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    hash: {
        type:String
    },
    ether: {
        type:Number
    },
    time: {
        type: String
    }
    
    }
);


const Transaction = module.exports = mongoose.model('Transaction', transaction);



module.exports.addTransaction = function(newTransaction, callback){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        // if (err) throw err;
        var dbo = db.db("meanauth");
        // var myquery = {username:dbvar.log};
          
          var newvalues = {'from':newTransaction.from, 'to':newTransaction.to, 'ether':newTransaction.ether, 'hash':newTransaction.hash, 'time':newTransaction.time };
        //   

        dbo.collection("transactions").insertOne( newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated"+res);
        //   db.close();
        });
    // },1000);
      });
      

}

// module.exports.getAllLocalTransactions = function(req, res){
   
//     MongoClient.connect(url,  { useNewUrlParser: true }, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("meanauth");
//     dbo.collection("transactions").find({}).toArray(function(err, result) {
//       if (err) throw err;
//     //   console.log(result);
//     //   db.close();
//     });
//   });
 
// }