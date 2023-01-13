import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/Cart';
import { OrderService, Status } from '../services/order.service';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart :CartItem[]=[];
  price:number=0;
  constructor(
    private cartService : CartService,
    private router : Router,
    private orderService : OrderService
  ) { }

  ngOnInit(): void {
    this.cartService.init();
    this.cartService.cart.subscribe(p=>{
      console.log(p);
      this.cart=p
    })
    this.cartService.price.subscribe(e=>this.price=e)
  }

  addQuantity=(p:number)=>this.cartService.addQuantity(p);
  reduceQuantity=(p:number)=>this.cartService.reduceQuantity(p);
  removeFromCart=(p:number)=>this.cartService.removeProductFromCart(p);
  toHome=()=>this.router.navigate(['store','home'])
  createCheckout=()=>{
    this.orderService.usingStripe();
    // const result:Status = this.orderService.createOrder()
    // if(result==Status.userNotFound){
    //   this.router.navigate(['user','login'])
    // }else if(result == Status.seccus){
    //   this.router.navigate(['store','checkout'])
    // }
  }
}
