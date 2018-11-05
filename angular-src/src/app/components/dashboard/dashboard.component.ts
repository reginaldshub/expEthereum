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

  




balance(network, account){
  //this.router.navigate(['local']);
  this.table = false;
  this.accountBalance = " ";
  this.useraccount.network = network;
  this.useraccount.account = account;
 
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

transaction(network, account){
  
  this.table = true;
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


}