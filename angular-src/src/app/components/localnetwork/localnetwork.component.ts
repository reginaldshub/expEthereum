import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

export interface PeriodicElement {
  _id:number;
  from: string;
  to:string;
  ether: number;
  hash: string;
  time:string;
}


let ELEMENT_DATA: PeriodicElement[];
@Component({
  selector: 'app-localnetwork',
  templateUrl: './localnetwork.component.html',
  styleUrls: ['./localnetwork.component.css']
})
export class LocalnetworkComponent implements OnInit {
  localtransactionlist;modalValues={};
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
  dataSource;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) {  
      this.localtransactionlistfunc();
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);}

   
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.checkConnection();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // ELEMENT_DATA = this.localtransactionlist;
  }

  localtransactionlistfunc(){
    this.authService.localTransactionList().subscribe(res => {
      // console.log(res);
      this.localtransactionlist = res;
      ELEMENT_DATA = this.localtransactionlist;
      // console.log(ELEMENT_DATA);
    })
  }

  displayedColumns: string[] = ['hash', 'from', 'ether'];
    
 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        // this.flashMessage.show("Good TO GO", {cssClass: 'alert-success', timeout:500})
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
  // this.pending();
  this.authService.sendTransaction(this.transac).subscribe(res => {
    console.log(res.hash.transactionHash);
      // this.pending();    
      this.localtransactionlistfunc();
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

  // localTransactionList(){
  
  // }


  localtransactionmodal(a){
    var val = a;
    var index = this.localtransactionlist.findIndex(function(item, i){
      return item.hash === val;
    });
    
    console.log("index Is"+index);
    this.modalValues = this.localtransactionlist[index];
  // console.log(index, filteredObj);
      console.log(this.modalValues);
    }



}