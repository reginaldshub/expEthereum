import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-localbalance',
  templateUrl: './localbalance.component.html',
  styleUrls: ['./localbalance.component.css']
})
export class LocalbalanceComponent implements OnInit {
  loc = {
    address:String
  }
  Balance;bol:boolean = false;
  
  connection:boolean = false;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.checkConnection();
  }
  checkConnection(){
    this.authService.checkConnection().subscribe(res => {
      if(res.success == false){
        // this.flashMessage.show("Contact Admin ", {cssClass: 'alert-danger', timeout:1000})
        this.connection = true;
        console.log(this.connection);
        // this.router.navigate(['dashboard']);
        // this.table = false;
      }
      else{
        this.connection = false;
        console.log(this.connection);
        // this.flashMessage.show("Good TO GO", {cssClass: 'alert-success', timeout:500})
      }
      console.log(res);
      
  },
  err => {
  console.log(err);
  return false;
  });
  }

  getLocalBalance(address){
    this.loc.address = address;
    this.authService.getLocalBalance(this.loc).subscribe(res => {
      console.log(res);
      this.Balance = res.balance;
      this.bol = true;
  });
  }
}
