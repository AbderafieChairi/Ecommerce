import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/models/Order';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders !:OrderDetail[];
  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.orders=[]
      if("id" in params){
        console.log(params["id"])
        this.orderService.getOrderbyId(parseInt(params["id"]))
        .then(res=>this.orders.push(res))
      }
    })
  }

}
