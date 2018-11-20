import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-localsendtransaction',
  templateUrl: './localsendtransaction.component.html',
  styleUrls: ['./localsendtransaction.component.css']
})
export class LocalsendtransactionComponent implements OnInit {
  transac = {
    from:String,
    to:String,
    value:Number,
    password:String
  }
  localTransactionHash;

  connection:boolean;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.checkConnection();
  }
  sendTransaction(from,to,value,password){
    if(this.connection == false){
  this.transac.from = from;
  this.transac.to = to;
  this.transac.value = value;
  this.transac.password = password;
  // this.pending();
  this.authService.sendTransaction(this.transac).subscribe(res => {
    // console.log(res.hash.transactionHash);
      // this.pending();    
      // this.localtransactionlistfunc();
    this.localTransactionHash = JSON.stringify(res.hash.transactionHash);

});
}
  }

  checkConnection(){
    this.authService.checkConnection().subscribe(res => {
      if(res.success == false){
        // this.flashMessage.show("Contact Admin ", {cssClass: 'alert-danger', timeout:1000})
        this.connection = true;
        // this.router.navigate(['dashboard']);
        // this.table = false;
      }
      else{
        this.connection = false;
        // this.flashMessage.show("Good TO GO", {cssClass: 'alert-success', timeout:500})
      }
      console.log(res);
      
  },
  err => {
  console.log(err);
  return false;
  });
  }
}
