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

  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {
  
    this.authService.getAccount().subscribe(res => {
      console.log(res);
      this.accounts = res.accounts;
    },
    err => {
      console.log(err);
      return false;
    });
}
}
