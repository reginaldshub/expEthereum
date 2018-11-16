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
 
  constructor(private authService: AuthService,
    private router:Router,private flashMessage: FlashMessagesService,
    private route:ActivatedRoute) { 
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.authService.localTransactionList().subscribe(res => {
        // console.log(res);
        this.localtransactionlist = res;
        ELEMENT_DATA = res;
  
        console.log(ELEMENT_DATA);
      })
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }

  displayedColumns: string[] = ['hash', 'from', 'ether'];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  localtransactionmodal(a){
    var val = a;
    console.log(a);
    var index = this.localtransactionlist.findIndex(function(item, i){
      return item.hash === val;
    });
    
    console.log("index Is"+index);
    this.modalValues = this.localtransactionlist[index];
  // console.log(index, filteredObj);
      console.log(this.modalValues);
    }

}
