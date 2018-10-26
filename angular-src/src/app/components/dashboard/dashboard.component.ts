import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  accountBalance;log;
  result;createdAccount;
  accounts;Balance;localTransactionHash;localPendingHash;
  localAccount:boolean;
  localPending:boolean;
  localTransaction:boolean;
  localList:boolean;
  localBalance:boolean;
  createclicked:boolean;
  balanceclicked:boolean;
  transactionclicked:boolean;
  table:boolean=false;
  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute,
    ) { }

  ngOnInit() { 
    
 }

//  connection(){}
  transac = {
    from:String,
    to:String,
    value:Number
  }
  loc = {
    address:String
  }
  local = {
    password:String
  }
 useraccount = {
    network:String,
    account: String,
    sender: String,
    receiver: String,
    privateKey: String,
    ethersValue:Number
  }

  db = {
    localAccountNumber:String,
    passphrase:String,
    log:String
  }

  checkConnection(){
    this.authService.checkConnection().subscribe(res => {
      if(res.success == false){
        this.flashMessage.show("Contact Admin Sir", {cssClass: 'alert-danger', timeout:5000})
        this.router.navigate(['dashboard']);
        this.table = false;
      }
      else{
        this.flashMessage.show("Good TO GO", {cssClass: 'alert-success', timeout:2000})
      }
      console.log(res);
      
},
err => {
console.log(err);
return false;
});
  }

  dbpush(localAccountNumber, password){
    this.db.localAccountNumber = localAccountNumber;
    this.db.passphrase = password;
    this.log = localStorage.getItem("user");
      this.log = JSON.parse(this.log);
      var l = this.log.username;
      this.db.log=l;
    this.authService.dbpush(this.db).subscribe(res => {
          console.log("success");
  },
  err => {
    console.log(err);
    return false;
  });
  }


balance(network, account){
  // this.checkConnection();
  // this.router.navigate(['balance']);
  this.table = false;
  this.accountBalance = " ";
  this.useraccount.network = network;
  this.useraccount.account = account;
  if(network == "local"){
    this.getLocalBalance(account);
  }
  else{
  this.authService.getBalance(this.useraccount).subscribe(Bal => {
      console.log(Bal.balance)
      if(Bal.balance == undefined){
        console.log(Bal.err.responseText);
        this.accountBalance += Bal.err.responseText;
      }else{
        this.accountBalance = "";
        this.accountBalance += Bal.balance;
        this.accountBalance += ".ethers";
      }

    //this.balance  = profile.balance;

  },
  err => {
    console.log(err);
    return false;
  });
}
}

transaction(network, account){
  
  this.table = true;
  this.checkConnection();
  this.useraccount.network = network;
  this.useraccount.account = account;
  
  this.authService.getTransaction(this.useraccount).subscribe(res => {
      console.log(res.response.body);
      let a = JSON.parse(res.response.body);
      // console.log(a.result[0]);
      this.result = a.result;

     // if(Bal.balance == undefined){
        // console.log();
        // this.transaction += ;
      // }else{
      //  console.log()
      // }

    //this.balance  = profile.balance;

  },
  err => {
    console.log(err);
    return false;
  });
}




//local Begins here

allfalse(){
  this.localAccount = false;
  this.localList = false;
  this.localBalance = false;
  this.localTransaction = false;
  this.localPending = false;
}

clear(){
  this.createclicked = false;
  this.transactionclicked  = false;
  this.balanceclicked  = false;
}

listAccount(){
  this.clear();
  this.localList = true;
  this.localAccount = false;
  this.localBalance = false;
  this.authService.getAccount().subscribe(res => {
    console.log(res.accounts);
    this.accounts = res.accounts;
  },
  err => {
    console.log(err);
    return false;
  });
}

createClick(){
  this.allfalse();
  this.clear();
this.createclicked = true;
}
createAccount(password){
  this.allfalse();
  this.localAccount = true;
  this.createclicked = false;
  this.local.password = password;
  this.authService.createAccount(this.local).subscribe(res => {
    console.log(res.created);
    this.createdAccount = res.created;
  },
  err => {
    console.log(err);
    return false;
  });
}
balanceClick(){
  this.allfalse();
  this.clear();
this.balanceclicked  = true;
}
getLocalBalance(address){
  this.allfalse();
  this.localBalance = true;
  this.balanceclicked  = false;
  this.loc.address = address;
  this.authService.getLocalBalance(this.loc).subscribe(res => {
    console.log(res);
    this.Balance = res.balance;
});
}
transactionClick(){
  this.clear();
  this.allfalse();
  this.transactionclicked  = true;
  }
  sendTransaction(from,to,value){
    this.transactionclicked  = false;
    this.allfalse();
    this.localTransaction = true;
  this.transac.from = from;
  this.transac.to = to;
  this.transac.value = value;
  this.pending();
  this.authService.sendTransaction(this.transac).subscribe(res => {
    console.log(res.hash.transactionHash);
      this.pending();    
    this.localTransactionHash = JSON.stringify(res.hash.transactionHash);
});
  }

  pending(){
    this.clear();
    this.allfalse();
    this.localPending = true;
    this.authService.pendingTransaction().subscribe(res => {
      console.log(res.status.pending);
      this.localPendingHash = res.status.pending;
  });
  }
}
