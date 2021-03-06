const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const Accountuser = require('../models/accountuser');
const config = require('../config/database');
var ethers = require('ethers');
var providers = require('ethers-providers');
var util = require('ethereumjs-util');
const Tx = require('ethereumjs-tx');
var request = require("request");
// local
const Web3 = require('web3');
const web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(web3Provider);
//end of local


router.post('/addAccount', (req, res, next) => {
//   console.log(req.body);
variable = req.body;
    User.addAccount(variable, (err, res) => {
        if(err){
            res.json({success:false, msg:'Failed to register user'})
        }else{
            res.json({success:true, msg:'user registered'})
        }
    })
});



router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        account: req.body.account
    });

    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success:false, msg:'Failed to register user'})
        }else{
            res.json({success:true, msg:'user registered'})
        }
    })
});

//local TRansaction

// router.post('/localTransaction', (req, res, next) => {
//     let newTransaction = new Transaction({
//         from: req.body.from,
//         to: req.body.to,
//         ether: req.body.ether,
//         hash: req.body.hash,
//         time: req.body.time
//     });

//     Transaction.addTransaction(newTransaction, (err, user) => {
//         if(err){
//             res.json({success:false, msg:'Failed to add transaction'})
//         }else{
//             res.json({success:true, msg:'transaction added'})
//         }
//     })
// });


User.getUserByUsername('tony',(err,user) => {
    if(err)
        console.log(err);
        else
        console.log(user)
})

router.get('/isConnected', (req, res, next) => {

    // web3.eth.net.isListening().then((res, err)=>{
    //     if(err){
    //         res.json({success:false, msg: "Please Contact admin"})
    //     console.log("err");
    //     }
    //     else{
    //         res.json({success:true, msg: "Good to go"});
    //     console.log("response");
    //     }
    // });

    web3.eth.net.isListening()
    .then(() => {
      console.log('is connected');
      res.json({success:true, msg: "Good to go"});
     
    })
    .catch(e => {console.log('Something went wrong')
    res.json({success:false, msg: "Please Contact admin"})
        });
    
    // if(web3.eth.isConnected()) {
    //    res.json({success:true, msg: "Good to go"});
    // } else {
    //     res.json({success:false, msg: "Please Contact admin"})
    // }

});


router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success:false, msg: "User not found"})
        }
        
        console.log(this.password);

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 3600
                });
                res.json({
                    success:true,
                    token: 'JWT ' + token,
                    user: {
                     id: user._id,   
                     name: user.name,
                     username: user.username,
                     email: user.email,
                     account: user.account
                }
            });
            }else{
                return res.json({success:false, msg: "Wrong Password"})
            }
        })
    })
});

router.post('/addToDB', (req, res, next) => {

    User.getUserByUsername('tony',(err,user) => {
        if(err)
            console.log(err);
            else
            console.log(user._id);
    })
})

router.post('/balance', (req, res, next) => {
    var etherStrin;
    let network = req.body.network;
    let account = req.body.account;
    let provider = ethers.getDefaultProvider(network);
    
    // web3.eth.personal.unlockAccount(account, "login@accion123", 600)
// .then(console.log('Account unlocked!'));
    // web3.eth.sendTransaction({
    //     from: account,
    //     to: "0x1b37d0412acca99222f61d500ac755a8e91db04d",
    //     value: '10'
    // })
    // .then((receipt) => {
    //     console.log("success"+"hash"+receipt);
    // });

    // provider.getTransaction(account).then((transaction) => {
    //     console.log(transaction);
    // });

    provider.getBalance(account).then((balance) => {
     etherString = ethers.utils.formatEther(balance);
        etherStrin = etherString;
        console.log(etherStrin);
        res.json({balance: etherStrin});
    
    }).catch(err => {console.log(err);
                        res.json({err:err})});

  //console.log(etherStrin);

    // setTimeout(() => {
    //     console.log("outside"+etherStrin);
        
    //     res.json({balance: etherStrin});
    //   }, 3000);
});

router.post('/transaction', (req, res, next) => {
    let network = req.body.network;
    let account = req.body.account;
    request(`https://api-${network}.etherscan.io/api?module=account&action=txlist&address=${account}&tag=latest&apikey=M9GI6SXIHUY3EWWPRB229DVT5JZZE7MJX4`, (error, response, body) => {
    // console.log("body"+body);
    // console.log("response"+response);
    res.json({body});
     }); 
});

router.post('/createAccount', (req, res, next) => {
    console.log(req.body.password);
    console.log("later");
     web3.eth.personal.newAccount(req.body.password)
    .then((created) => {
        console.log(created);
        res.json({created});

        data = {
            accountno:created,
            name:req.body.name,
            password:req.body.password
        }

        console.log(data)

        Accountuser.adduseraccount(data, (err, res) => {
            if(err){
                res.json({success:false, msg:'Failed to create accout'})
            }else{
                res.json({success:true, msg:'account created'})
            }
        })

    });         
});

router.post('/localbalance', (req, res, next) => {
    console.log(req.body.address);
    // var query = { name:  req.body.address};
    // Accountuser.find(query).toArray(function (err, acc) {
        //    console.log("hey"+acc);
        //    res.send(acc);
        //    web3.eth.getBalance(acc)
        //    .then((balance) => {
        //     bal = balance.toString(10);
        //     finalBal = web3.utils.fromWei(bal, 'ether');
        //     console.log(finalBal);
        //     res.json({balance:finalBal})
        // })
        // });

        var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("meanauth");
  var query = { name:req.body.address };
  dbo.collection("accountuser").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0].accountno);
    web3.eth.getBalance(result[0].accountno)
           .then((balance) => {
            bal = balance.toString(10);
            finalBal = web3.utils.fromWei(bal, 'ether');
            console.log(finalBal);
            res.json({balance:finalBal})
        })
    db.close();
  });
});
       
    
});


// web3.eth.sendTransaction({from:'0x80f38b4db9e910bb1dd3019ab44aa947180ccb3d', to: '0xa8ade7feab1ece71446bed25fa0cf6745c19c3d5', value: web3.toWei(10, "ether")})
router.post('/localtransaction', (req, res, next) => {
    // console.log(req.body.from);
    // console.log(req.body.to);
    // console.log(req.body.value);
    // web3.eth.miner.start(1);
    // web3.eth.personal.unlockAccount(req.body.from, "password");
    // web3.eth.personal.unlockAccount(req.body.to, "password",3000);

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("meanauth");
  dbo.collection("accountuser").find({ name:req.body.from }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result[0].accountno);
    from = result[0].accountno;
    dbo.collection("accountuser").find({ name:req.body.to }).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0].accountno);
        to = result[0].accountno;
        console.log("From"+from+"to"+to);

   web3.eth.personal.unlockAccount(from, req.body.password);
    web3.eth.sendTransaction({
        'to': to,
        'from': from,
        'value': req.body.value
    })
    .then(function(receipt){
        var datetime = new Date();
        hashval = receipt.blockHash;
        console.log("this is hash"+hashval);
        let newTransaction = new Transaction({
            from: req.body.from,
            to: req.body.to,
            ether: req.body.value,
            hash: hashval,
            time: datetime
        });
    
        Transaction.addTransaction(newTransaction, (err, res) => {
            if(err){
                res.json({success:false, msg:'Failed to add transaction'})
            }else{
                res.json({success:true, msg:'transaction added'})
            }
        })
        console.log(receipt);
    });

        db.close();
      });
  });
});

 

// above uncoment

    // web3.eth.sendTransaction({from: req.body.from, to:req.body.to, value: web3.utils.toWei(req.body.value, 'ether'), gasLimit: 21000, gasPrice: 20000000000})
    // .then(function(err,hash){
    //     if(err){
    //         //console.log("hash"+err);
    //         setTimeout(() =>{
    //             res.json({hash:err});
    //         },10000);
            
    //     }       
    //     else
    //     console.log("err"+err);
    // });
});
router.get('/pendingTransaction', (req, res, next) => {
    //txpool
web3.eth.extend({
    property: 'txpool',
    methods: [{
      name: 'content',
      call: 'txpool_content'
    },{
      name: 'inspect',
      call: 'txpool_inspect'
    },{
      name: 'status',
      call: 'txpool_status'
    }]
  });

  web3.eth.txpool.status().then((status)=>{
    res.json({status:status})
  }).catch(console.error);

});


router.get('/getAccounts', (req, res, next) => {
  
    // to get accounts directly from geth 
// const getAccount = async () => {
//    const accounts = await web3.eth.getAccounts();
//    console.log(accounts);
//    res.json({accounts:accounts});
// };
// getAccount();
//

//get accounts from database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("meanauth");
  dbo.collection("accountuser").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    
  });
});
})

router.get('/localTransactionList', (req, res, next) => {

    Transaction.find({},function (err, trans) {
    //    console.log(trans);
       res.send(trans);
    });

    


// Transaction.getAllLocalTransactions((req, res ) => {
//     // if(err) throw err;
   
//         console.log("response in users"+res);
// })

});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    var etherString = new Array();
    address = req.user.account;
    network = ["rinkeby", "ropsten","kovan"];

    
    const provider0 = providers.getDefaultProvider(network[0]);
    const provider1 = providers.getDefaultProvider(network[1]);
    const provider2 = providers.getDefaultProvider(network[2]);

     provider0.getBalance(address).then((balance) => {
        etherString[0] = ethers.utils.formatEther(balance);         
});

provider1.getBalance(address).then((balance) => {
    etherString[1] = ethers.utils.formatEther(balance);         
});
provider2.getBalance(address).then((balance) => {
    etherString[2] = ethers.utils.formatEther(balance);         
});

    setTimeout(() => {
    console.log("outside"+etherString);
        
    res.json({balance: etherString, user: req.user});
  }, 2000);

});

module.exports = router;
