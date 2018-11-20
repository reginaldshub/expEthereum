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
    password:String,
    name:String
  }
  createdAccount:string;
  StringP:string;
  connection:boolean;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.checkConnection();
  }

  checkConnection(){
    this.authService.checkConnection().subscribe(res => {
      if(res.success == false){
        this.connection = true;
        // this.flashMessage.show("Contact Admin ", {cssClass: 'alert-danger', timeout:1000})
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

  createAccount(name, password){

   if(password.length >= 1){
    this.local.password = password;
    this.local.name = name;
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
