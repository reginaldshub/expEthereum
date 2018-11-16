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
    value:Number
  }
  localTransactionHash;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  }
  sendTransaction(from,to,value){
  this.transac.from = from;
  this.transac.to = to;
  this.transac.value = value;
  // this.pending();
  this.authService.sendTransaction(this.transac).subscribe(res => {
    console.log(res.hash.transactionHash);
      // this.pending();    
      // this.localtransactionlistfunc();
    this.localTransactionHash = JSON.stringify(res.hash.transactionHash);

});
  }
}
