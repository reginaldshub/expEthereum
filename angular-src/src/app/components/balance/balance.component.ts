import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router: Router) {   }
              account;

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.account = params.account;
      console.log(params.account); 
    });
    // this.router.navigate(['dashboard']);
  }

}
