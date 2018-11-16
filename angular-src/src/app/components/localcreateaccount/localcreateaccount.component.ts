import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-localcreateaccount',
  templateUrl: './localcreateaccount.component.html',
  styleUrls: ['./localcreateaccount.component.css']
})
export class LocalcreateaccountComponent implements OnInit {
  local = {
    password:String
  }
  createdAccount:string;
  StringP:string;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  }


  createAccount(password){

   if(password.length >= 1){
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

//   if(password.length >1){
// this.StringP = "tony"
//   }
//   else{
// this.StringP = "anthony"
//   }


  }

}
