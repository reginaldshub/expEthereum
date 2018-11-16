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
  localPendingHash;decimalnum;


  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { }

  ngOnInit() {   
    this.authService.pendingTransaction().subscribe(res => {
      console.log(res.status.pending);
      this.localPendingHash = res.status.pending;
      this.decimalnum = parseInt(this.localPendingHash, 16);
  });
  }

}
