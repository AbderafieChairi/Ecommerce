import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderData, OrderDetail } from 'src/app/models/Order';
import { OrderItem } from 'src/app/models/OrderItem';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from './cart.service';
import { User } from 'src/app/models/User';
import { loadStripe } from '@stripe/stripe-js';
import * as jwt from "jwt-simple"
export enum Status{
  userNotFound,
  error,
  seccus
}
export const secret='fe1a1915a379f3be5394b64d14794932'
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  order =new BehaviorSubject<Order>(this.orderStorage)
  constructor(
    private authService :AuthService,
    private cartService :CartService,
    ) {
      this.order.subscribe(o=>this.orderStorage=o);
  }
  get orderStorage():Order{
    const order_st = localStorage.getItem("order");
    return order_st!=null ? JSON.parse(order_st):{} as Order;
  }
  set orderStorage(order:Order){
    localStorage.setItem("order",JSON.stringify(order));
  }


  SubmitOrder():Status {
      let user = this.authService.getCurrentUser();
      if(user=={} as User) {
        console.log("user not found ")
        return Status.userNotFound;
      }
      try {
        let cart = this.cartService.cart.value;
        let total = this.cartService.countTotalPrice();
        let orderItems = cart.map(x=>{return {quantity: x.quantity,
          product: x.product
        } as OrderItem
        })
        let order: Order = {
          id:0,
          total: total,
          orderItems: orderItems,
          user: user,
          createdAt:new Date()
        };
        this.order.next(order);
        this.post("order/"+user.id.toString(),order)
        this.cartService.resetCart();
        return Status.seccus        
      } catch (error) {
        return Status.error;
      }
  }
  getOrder(){
    return this.orderStorage;
  }
  init(){
  }

  post(endpoint:String,data:any){
    console.log("post :http://localhost:8080/"+endpoint);
    return fetch('http://localhost:8080/'+endpoint,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    });
  }
  async get(endpoint:String){
    return fetch('http://localhost:8080/'+endpoint)
  }

  async getOrderbyUser(){
    return this.get("order/user/"+this.authService.getCurrentUser().id)
    .then(res=>res.json())
    .then((json:OrderData[])=>json)
  }
  async getOrderbyId(id:number){
    return this.get("order/"+id)
    .then(res=>res.json())
    .then((json:OrderDetail)=>json)
  }

  async getOrders(){
    return this.get("order")
    .then(res=>res.json())
    .then((json:OrderDetail[])=>json)
  }


  testToken(token:string){
    try {
      const data = jwt.decode(token,secret,true)
      if(data.app =='Ecommerce'){
        return true
      }
      return false
    } catch (error) {
      return false
    }
  }


  usingStripe(){
    // var token = jwt.encode({app:'Ecommerce'}, secret);
    if(this.authService.getCurrentUser()=={} as User) {
      return Status.userNotFound;
    }
    try{
      fetch("http://localhost:4242/checkout", {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          items: this.cartService.cart.value,
          // token:token
        })
      })
      .then(res=>res.json())
      .then(async json=>{
        console.log(json)
        let stripe  =await loadStripe("pk_test_51MOzgsDje7TaFP6ibOQJOBiTmUehabLvDkKcgIEJNLS2E3wwUHdWVM8wtBxygW2X5T3Yz3oTvq3QCmUaIebbq9bS00HwXuZbLz")
        stripe?.redirectToCheckout({
          sessionId:json.id
        })
      })
      return Status.seccus        
    } catch (error) {
      return Status.error;
    }
  }
}

