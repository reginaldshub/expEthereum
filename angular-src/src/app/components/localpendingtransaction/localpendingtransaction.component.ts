import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-localpendingtransaction',
  templateUrl: './localpendingtransaction.component.html',
  styleUrls: ['./localpendingtransaction.component.css']
})
export class LocalpendingtransactionComponent implements OnInit {
  localPendingHash;decimalnum;startMiner;


  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {   
    this.checkConnection();
    this.authService.pendingTransaction().subscribe(res => {
      console.log(res.status.pending);
      this.localPendingHash = res.status.pending;
      this.decimalnum = parseInt(this.localPendingHash, 16);
      if(this.decimalnum > 0){
        this.startMiner = "Please start Mining to mine pending transactions"
      }
  });
  }

  checkConnection(){
  this.authService.checkConnection().subscribe(res => {
    if(res.success == false){
      this.flashMessage.show("Contact Admin ", {cssClass: 'alert-danger', timeout:2000})
      this.router.navigate(['dashboard']);
      // this.table = false;
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

}
