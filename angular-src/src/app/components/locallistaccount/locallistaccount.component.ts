import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

@Component({
  selector: 'app-locallistaccount',
  templateUrl: './locallistaccount.component.html',
  styleUrls: ['./locallistaccount.component.css']
})
export class LocallistaccountComponent implements OnInit {
  accounts;
  connection:boolean;

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  
this.checkConnection();
    this.authService.getAccount().subscribe(res => {
      console.log(res);
      this.accounts = res;
    },
    err => {
      console.log(err);
      return false;
    });
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
