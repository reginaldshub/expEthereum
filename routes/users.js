const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
    User.addAccount(variable, (err, callback) => {
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

User.getUserByUsername('tony',(err,user) => {
    if(err)
        console.log(err);
        else
        console.log(user)
})


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
                    expiresIn: 604800
                });
                res.json({
                    success:true,
                    token: 'JWT ' + token,
                    user: {
                     id: user._id,   
                     name: user.name,
                     username: user.username,
                     email: user.email
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
    res.json({response});
     }); 
});

router.post('/createAccount', (req, res, next) => {
    console.log(req.body.password);
    console.log("later");
     web3.eth.personal.newAccount(req.body.password)
    .then((created) => {
        console.log(created);
        res.json({created});

    });         
});

router.post('/localbalance', (req, res, next) => {
    console.log(req.body.address);
    web3.eth.getBalance(req.body.address)
    .then((balance) => {
        bal = balance.toString(10);
        finalBal = web3.utils.fromWei(bal, 'ether');
        console.log(finalBal);
        res.json({balance:finalBal})
    })
});


// web3.eth.sendTransaction({from:'0x80f38b4db9e910bb1dd3019ab44aa947180ccb3d', to: '0xa8ade7feab1ece71446bed25fa0cf6745c19c3d5', value: web3.toWei(10, "ether")})
router.post('/localtransaction', (req, res, next) => {
    console.log(req.body.from);
    console.log(req.body.to);
    console.log(req.body.value);
    web3.eth.miner.start(1);
    web3.eth.personal.unlockAccount(req.body.from, "password",3000);
    web3.eth.personal.unlockAccount(req.body.to, "password",3000);
    web3.eth.sendTransaction({
        'to': req.body.to,
        'from': req.body.from,
        'value': req.body.value
    })
    .then(function(receipt){
        console.log(receipt);
    });

    web3.eth.sendTransaction({from: req.body.from, to:req.body.to, value: web3.utils.toWei(req.body.value, 'ether'), gasLimit: 21000, gasPrice: 20000000000})
    .then(function(err,hash){
        if(err){
            //console.log("hash"+err);
            setTimeout(() =>{
                res.json({hash:err});
            },10000);
            
        }       
        else
        console.log("err"+err);
    });
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
    
const getAccount = async () => {
   const accounts = await web3.eth.getAccounts();
   console.log(accounts);
   res.json({accounts:accounts});
};
getAccount();
})

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
