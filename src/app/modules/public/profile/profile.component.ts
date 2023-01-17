import { Component, OnInit } from '@angular/core';
import { Col } from 'src/app/components/table/table.component';
import { Order, OrderData, OrderDataTitle } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = JSON.parse(localStorage.getItem("user")||"");
  orders:OrderData[]=[];
  displayedColumns: Col[]=[]
  constructor(
    private os :OrderService,
    private router:Router
    
    ) { }

  ngOnInit(): void {
    
    this.os.getOrderbyUser()
    .then(res=>{
      this.displayedColumns=res?Object.keys(OrderDataTitle).map(i=>{return {col:i,asc:"ASC",sel:false,name:OrderDataTitle[i]}}):[];
      this.orders=res
    })
  }
  tableData:any[]=[];
  setTableData(T:any[]){
    this.tableData=T;
  }
 

  toOrder(id:number){
    this.router.navigate(["store","order"],{
      queryParams:{id}
    })
  }
}
