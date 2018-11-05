import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-localnetwork',
  templateUrl: './localnetwork.component.html',
  styleUrls: ['./localnetwork.component.css']
})
export class LocalnetworkComponent implements OnInit {
 
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
  pushclicked:boolean;
  transactionclicked:boolean;
  table:boolean=false;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

   

  ngOnInit() {
    this.checkConnection();
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


//local Begins here

allfalse(){
  this.localAccount = false;
  this.localList = false;
  this.localBalance = false;
  this.localTransaction = false;
}

clear(){
  this.localPending = false;
  this.localList = false;
  this.createclicked = false;
  this.transactionclicked  = false;
  this.balanceclicked  = false;
  this.pushclicked = false;
}

listAccount(){
  this.checkConnection();
  if(this.localList == true){
    this.clear();
  }
  else {
    this.clear();
    this.localList = true;
  }
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

pushClick(){
  this.checkConnection();
  this.allfalse();  
  if(this.pushclicked == true){
    this.clear();
  }
// this.pushclicked = false;
else{
  this.clear();
this.pushclicked = true;
}
}

dbpush(localAccountNumber, password){
  this.allfalse();
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

createClick(){
  this.checkConnection();
  this.allfalse();
  if(this.createclicked == true){
    this.clear();
  }
// this.createclicked = false;
else{
this.clear();
this.createclicked = true;
}
}
createAccount(password){
  this.allfalse();
  this.localAccount = true;
  // this.createclicked = false;
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
  this.checkConnection();
  this.allfalse();
  if(this.balanceclicked == true){
    this.clear();
  }
  // this.balanceclicked = false;
  else{
    this.clear();
    this.balanceclicked = true;
  }
  
}
getLocalBalance(address){
  this.checkConnection();
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
  this.checkConnection();
  this.allfalse();
  if(this.transactionclicked == true){
    this.clear();
  }
  // this.transactionclicked = false;
  else{
    this.clear();
    this.transactionclicked = true;
  }
  
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
    this.checkConnection();
    this.allfalse();
    if(this.localPending == true){
      this.clear();
    }
    else{
      this.clear();
      this.localPending = true;
    }
    
   
    this.authService.pendingTransaction().subscribe(res => {
      console.log(res.status.pending);
      this.localPendingHash = res.status.pending;
  });
  }
  myFunction(network){
console.log("triggered"+network);

  }

}