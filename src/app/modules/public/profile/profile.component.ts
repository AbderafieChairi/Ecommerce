import { Component, OnInit } from '@angular/core';
import { Col } from 'src/app/components/table/table.component';
import { Order } from 'src/app/models/Order';
import { User } from 'src/app/models/User';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user  = JSON.parse(localStorage.getItem("user")||"");
  orders:Order[]=[];
  // cols :Col=["time",];
  constructor(private os :OrderService) { }

  ngOnInit(): void {
    this.os.getOrderbyUser()
    .then(res=>this.orders=res)
  }

}
