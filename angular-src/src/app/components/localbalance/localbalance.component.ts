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
  

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
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
