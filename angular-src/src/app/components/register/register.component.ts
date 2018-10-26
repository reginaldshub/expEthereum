import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from '../../flash/flash-messages.service';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email:String;
  password: String;
  account: String;
  constructor(private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      account: this.account
    }
  
    // REquired fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Fill All Fields", {cssClass: 'alert-danger', timeout:3000})
      return false;
    }
    // REquired fields
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("invalid email",{ cssClass: 'alert-danger', timeout: 2000 }); 
      return false;
    }
    // if(this.validateService.validateRegister(user) && this.validateService.validateEmail(user.email)){
    //   this.flashMessage.show("details Updated",{ cssClass: 'alert-success', timeout: 2000 });
    // }
4 
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("You are now Registered and can login",{ cssClass: 'alert-success', timeout: 2000 }); 
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("Something went Wrong",{ cssClass: 'alert-danger', timeout: 2000 }); 
        this.router.navigate(['/register'])
      }
    })
    }
}
