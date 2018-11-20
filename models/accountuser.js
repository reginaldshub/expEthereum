const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const config = require('../config/database')
url = 'mongodb://localhost:27017/';


const accountuser = mongoose.Schema({
    name: {
        type: String
    },
    account: {
        type: String
    }
    
    });


const Accountuser = module.exports = mongoose.model('Accountuser', accountuser);

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    accountuser.findOne(query, callback);
}


module.exports.adduseraccount = function(data, callback){
    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        // if (err) throw err;
        var dbo = db.db("meanauth");
        // var myquery = {username:dbvar.log};
          
        //   var newvalues = {'accountnumber':data.accountno, 'name':data.name, 'password':data.password };
        //   

        dbo.collection("accountuser").insertOne( data, function(err, res) {
          if (err) throw err;
          console.log("1 document updated"+res);
        //   db.close();
        });
    // },1000);
      });
      

}

// module.exports.adduseraccount = function(data, res){
// MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("meanauth");
//   var query = { name: data };
//   dbo.collection("accountuser").find(query).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     res.send(result);
//   });
// });
// }
