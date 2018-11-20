import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from '../../flash/flash-messages.service';

import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';

export interface PeriodicElement {
  _id:number;
  from: string;
  to:string;
  ether: number;
  hash: string;
  time:string;
}


let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-localtransactions',
  templateUrl: './localtransactions.component.html',
  styleUrls: ['./localtransactions.component.css']
})

export class LocaltransactionsComponent implements OnInit {
  localtransactionlist;modalValues={};dataSource;
  connection:boolean;
  userFilter: any={from:''};
  p: number = 1;result;
 
  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { 
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
     
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.checkConnection();
    this.authService.localTransactionList().subscribe(res => {
      // console.log(res);
      this.localtransactionlist = res;
      ELEMENT_DATA = res;
      this.result = res;

      console.log(ELEMENT_DATA);
    })
   
  }

  checkConnection(){
    this.authService.checkConnection().subscribe(res => {
      if(res.success == false){
        // this.flashMessage.show("Contact Admin ", {cssClass: 'alert-danger', timeout:2000})
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


  localtransactionmodal(a){
    var val = a;
    console.log(a);
    var index = this.localtransactionlist.findIndex(function(item, i){
      return item.from === val;
    });
    
    console.log("index Is"+index);
    this.modalValues = this.localtransactionlist[index];
  // console.log(index, filteredObj);
      console.log(this.modalValues);
    }


    displayedColumns: string[] = ['hash', 'status'];

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
