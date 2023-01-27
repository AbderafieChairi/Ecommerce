import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from 'src/app/models/Order';
import { OrderService } from '../../public/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders !:OrderDetail[];
  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.orders=[]
        this.orderService.getOrders()
        .then(res=>this.orders.push(res))
      
  }

}
