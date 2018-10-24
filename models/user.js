const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
const config = require('../config/database')
url = 'mongodb://localhost:27017/';

//schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    localAccountNumber: {
        type: String
    },
    passphrase: {
        type: String
    }
    }
);

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}


module.exports.addAccount = function(dbvar, callback){
    // console.log(dbvar);
    // var myquery = ;
    // var newvalues = ;
    
    // dbo.user.updateOne({username:"tony"}, {$set:{localAccountNumber:"0x80F38B4DB9e910bb1dd3019AB44AA947180cCB3D", passphrase: "password" } });
    // , function(err, res) {
    //     if(res)
    //     console.log(res);
    //     else
    //     console.log("err" + err)
    //   });

    MongoClient.connect(url, { useNewUrlParser: true },function(err, db) {
        // if (err) throw err;
        var dbo = db.db("meanauth");
        var myquery = {username:dbvar.log};
       
        var arr_account = [];
        var arr_passphrase = [];
        dbo.collection("users").findOne( myquery, function(err, res) {
            if (err) throw err;
            // console.log(res.localAccountNumber);
            arr_account = res.localAccountNumber;
            arr_passphrase = res.passphrase;
            db.close();
          });
          setTimeout(() => {
          console.log(arr_account);
          console.log(arr_passphrase);
          
          arr_account.push(dbvar.localAccountNumber);
          arr_passphrase.push(dbvar.passphrase);
          console.log(arr_account);
          console.log(arr_passphrase);
          
          var newvalues = { $addToSet: {localAccountNumber:dbvar.localAccountNumber, passphrase:dbvar.passphrase } };


        dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated"+res);
        //   db.close();
        });
    },1000);
      });
      

}

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err)throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}