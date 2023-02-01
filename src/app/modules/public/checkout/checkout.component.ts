import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrderService } from '../services/order.service';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/Cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  order :Order = JSON.parse(localStorage.getItem("order") ||"{}");
  products :CartItem[]= JSON.parse(localStorage.getItem("cart") ||"{}Ò");
  // checkoutForm: FormGroup;
  seccus=new BehaviorSubject<boolean>(true);
  token:String="";
  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      const b:boolean=params['seccus'] =="true"
      console.log(b);
      this.seccus.next(b)

      if(b){
        console.log("submit order to server ")
        this.orderService.SubmitOrder()
      }
    })
    
  }
  constructor(
    private orderService:OrderService,
    private router : Router,
    private route :ActivatedRoute
    ){

  }
  toHome(){
    this.router.navigate(["store","home"])
    
  }


}
