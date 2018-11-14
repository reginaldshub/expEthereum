import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';
import {Sort} from '@angular/material';

@Component({
  selector: 'app-testnetwork',
  templateUrl: './testnetwork.component.html',
  styleUrls: ['./testnetwork.component.css']
})
export class TestnetworkComponent implements OnInit {
  accountBalance;log;modalValues="";dateString;
  result = [];createdAccount;
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
    private route:ActivatedRoute) { 
      


      
    }
    
    account;username;network;
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

  ngOnInit() {
    //  this.internetConnection();

    let user;
    user = localStorage.getItem("user");
    user = JSON.parse(user);
   this.account = user.account;
   this.username = user.username;

    this.route.queryParams
    .subscribe(params => {
      console.log(params)
      this.network = params.network;
      console.log(params.network); 

      this.useraccount.network = this.network;
      this.useraccount.account = this.account;
      
  
     
      this.authService.getBalance(this.useraccount).subscribe(Bal => {
          if(Bal.balance == undefined){
            console.log(Bal.err.responseText);
            // this.accountBalance += Bal.err.responseText;
          }else{
            setTimeout(() => {
            this.accountBalance = "";
            this.accountBalance += Bal.balance;
            this.accountBalance += ".ethers";
          },2000);
          }});


          this.authService.getTransaction(this.useraccount).subscribe(res => {
            let a = JSON.parse(res.response.body);
            console.log("parsed"+a.result);
            
            
            this.result = a.result;
            
          });    


    });
  

  
  }

  
// 


internetConnection(){
  if(navigator.onLine){
    console.log("onLine");

  }
    else{
    console.log("offline");
  }
}


  transData(a){
  //  console.log(this.result.indexOf(a));
  // var index = this.result.findIndex(obj => obj.hash==a);
  
  var val = a;
  var index = this.result.findIndex(function(item, i){
    return item.hash === val;
  });
  
  console.log("index Is"+index);
  this.modalValues = this.result[index];
// console.log(index, filteredObj);
    console.log(index);


    var theDate = new Date(this.result[index].timeStamp * 1000);
    this.dateString = theDate.toUTCString();
    
  
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


  
  // dbpush(localAccountNumber, password){
  //   this.db.localAccountNumber = localAccountNumber;
  //   this.db.passphrase = password;
  //   this.log = localStorage.getItem("user");
  //     this.log = JSON.parse(this.log);
  //     var l = this.log.username;
  //     this.db.log=l;
  //   this.authService.dbpush(this.db).subscribe(res => {
  //         console.log("success");
  // },
  // err => {
  //   console.log(err);
  //   return false;
  // });
  // }

 

  balance(network, account){
    // this.checkConnection();
    //this.router.navigate(['local']);
    this.table = false;
    this.accountBalance = " ";
    this.useraccount.network = this.network;
    this.useraccount.account = this.account;
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
    this.checkConnection();
    this.useraccount.network = network;
    this.useraccount.account = account;
    
    this.authService.getTransaction(this.useraccount).subscribe(res => {
        console.log(res.response.body);
        let a = JSON.parse(res.response.body);
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
