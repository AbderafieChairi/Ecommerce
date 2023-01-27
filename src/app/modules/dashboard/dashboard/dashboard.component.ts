import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/models/Order';
import { OrderService } from '../../public/services/order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ActualtotalSells!:number;
  ActualsellsAvgPrice!:number;
  ActualnumberOfSells!:number;

  previoustotalSells!:number;
  previoussellsAvgPrice!:number;
  previousnumberOfSells!:number;

  vartotalSells!:number;
  varsellsAvgPrice!:number;
  varnumberOfSells!:number;

  var1trending:string="trending_down";
  var2trending:string="trending_down";
  var3trending:string="trending_down";
  style1:string="row g-1 text-red-dark-2 font-md";
  style2:string="row g-1 text-red-dark-2 font-md";
  style3:string="row g-1 text-red-dark-2 font-md";

  orders !:OrderDetail[];
  ActualOrders !:OrderDetail[];
  previousOrders !:OrderDetail[];
  constructor(
    private orderService:OrderService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.orders=[]
        this.orderService.getOrders()
        .then(res=>this.orders.push(res));
      
      this.ActualOrders=this.orders.filter(x=>x.createdAt.getMonth()==this.getCurrentMonth()?true:false);

      this.previousOrders=this.orders.filter(x=>x.createdAt.getMonth()==(this.getCurrentMonth()-1)%12?true:false);

      this.ActualtotalSells=this.ActualOrders.reduce((a,v)=>{return a+v.total},0);
      this.ActualsellsAvgPrice=this.ActualtotalSells/this.ActualOrders.length;
      this.ActualnumberOfSells=this.ActualOrders.length;

      this.previoustotalSells=this.previousOrders.reduce((a,v)=>{return a+v.total},0);
      this.previoussellsAvgPrice=this.previoustotalSells/this.previousOrders.length;
      this.previousnumberOfSells=this.previousOrders.length;

      this.vartotalSells=(this.ActualtotalSells-this.previoustotalSells)*100/this.previoustotalSells;
      if(this.vartotalSells>=0){
        this.var1trending="trending_up";
        this.style1="row g-1 text-green-dark-2 font-md";
      }

      this.varsellsAvgPrice=(this.ActualsellsAvgPrice-this.previoussellsAvgPrice)*100/this.previoussellsAvgPrice;
      if(this.varsellsAvgPrice>=0){
        this.var2trending="trending_up";
        this.style2="row g-1 text-green-dark-2 font-md";
      }

      this.varnumberOfSells=(this.ActualnumberOfSells-this.previousnumberOfSells)*100/this.previousnumberOfSells;
      if(this.varnumberOfSells>=0){
        this.var3trending="trending_up";
        this.style3="row g-1 text-green-dark-2 font-md";
      }
      
  }

  getCurrentMonth() {
    return new Date().getMonth();
  }

  // constructor(private productService:ProductService) { }

  // ngOnInit(): void {
  //   this.totalSells=this.productService.getTotalSells();
  //   console.log("ici"+this.totalSells);
  // }

}
