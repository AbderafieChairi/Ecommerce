import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDataAdmin, OrderDataAdminTitle, OrderDetail } from 'src/app/models/Order';
import { OrderService } from '../services/order.service';
import { Col } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders !:OrderDataAdmin[];
  displayedColumns: Col[]=[]
  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
      this.orders=[]
        this.orderService.getorders()
        .then(res=>{
          this.displayedColumns=res?Object.keys(OrderDataAdminTitle).map(i=>{return {col:i,asc:"ASC",sel:false,name:OrderDataAdminTitle[i]}}):[];
          this.orders=res;
        })
  }
  tableData:any[]=[];
  setTableData(T:any[]){
    this.tableData=T;
  }
 

  toOrder(id:number){
    this.router.navigate(["admin","order"],{
      queryParams:{id}
    })
  }
  deleteOrder(id:number){
    this.orderService.deleteOrder(id)
    .then(()=>window.location.reload())
  }
}
