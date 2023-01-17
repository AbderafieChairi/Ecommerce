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
  order =new BehaviorSubject<Order>({} as Order)
  constructor(
    private authService :AuthService,
    private cartService :CartService,
    // private http:HttpClient
    ) {
  }



  SubmitOrder():Status {
      let userStorage = localStorage.getItem("user")
      if(userStorage==null) {
        console.log("user not found ")
        return Status.userNotFound;
      }
      try {
        let user : User = JSON.parse(userStorage || "");
        let cart = this.cartService.cart.value;
        let deliveryType = "POD";
        let deliveryPrice = 1000;
        let subtotal = this.cartService.countTotalPrice();
        let total = subtotal + deliveryPrice;
        let orderItems = cart.map(x=>{return {quantity: x.quantity,
          product: x.product
        } as OrderItem
        })
        let order: Order = {
          id:0,
          subtotal: subtotal,
          total: total,
          deliveryType: deliveryType,
          deliveryPrice: deliveryPrice,
          orderItems: orderItems,
          user: user
        };
        localStorage.setItem("order",JSON.stringify(order));
        this.order.next(order);
        console.log(order)
        this.post("order/"+user.id.toString(),order)
        this.cartService.resetCart();
        return Status.seccus        
      } catch (error) {
        return Status.error;
      }
  }
  getOrder(){
    const order = localStorage.getItem("order")
    return order ? order:{};
  }
  async init(){
    this.order
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
  delete(endpoint:String){
    console.log('http://localhost:8080/'+endpoint)
    return fetch('http://localhost:8080/'+endpoint,{method:'DELETE'})
  }


  async getOrderbyUser(){
    const user = JSON.parse(localStorage.getItem("user")||"");
    return this.get("order/user/"+user.id)
    .then(res=>res.json())
    .then((json:OrderData[])=>json)
  }
  async getOrderbyId(id:number){
    return this.get("order/"+id)
    .then(res=>res.json())
    .then((json:OrderDetail)=>json)
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
    console.log("using Stripe")
    // var token = jwt.encode({app:'Ecommerce'}, secret);
    let userStorage = localStorage.getItem("user")
    if(userStorage==null) {
      console.log("user not found ")
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

