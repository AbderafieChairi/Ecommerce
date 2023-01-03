import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { Product, ProductCart } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  price = new BehaviorSubject<number>(0)
  cart =new BehaviorSubject<Cart>({} as Cart)
  constructor() {
    this.cart.subscribe(
      args=>{
        this.price.next(args.cartItems.reduce(
          (i,j)=>i+j.product.price*j.quantity,0
        ))
      }
    )
  }

  async init(){
    console.log("init ....")
    const cart_id = localStorage.getItem("cart_id")
    if (cart_id==null){
      console.log("create Cart")
      fetch('http://10.72.128.43:8080/cart',{
        method:'POST',
        body:JSON.stringify({alue:'hhhh'}),
        headers:{
          "Content-Type":"application/json; charset=utf8"
        }
      })
      .then(res=>res.json())
      .then((json:Cart)=>{localStorage.setItem("cart_id",json.id.toString());this.cart.next(json)})
    }else{
      console.log("get Cart")
      fetch('http://10.72.128.43:8080/cart/'+cart_id)
      .then(res=>res.json())
      .then((json:Cart)=>this.cart.next(json))
    }
  }

  post(endpoint:String,data:any){
    return fetch('http://10.72.128.43:8080/'+endpoint,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    });
  }
  async get(endpoint:String){
    return fetch('http://10.72.128.43:8080/'+endpoint)
  }
  delete(endpoint:String){
    console.log('http://10.72.128.43:8080/'+endpoint)
    return fetch('http://10.72.128.43:8080/'+endpoint)
  }
  public getProduct(){
    return this.cart;
  }
  public addToCart(product :Product){
    console.log("add to cart function")
    this.post('cartitem/'+this.cart.value.id,{quantity:1,product})
    .then(res=>this.init())
  }
  removeFromCart(id : number){
    this.get("cart/"+this.cart.value.id+"/"+id)
    .then(res=>this.init())
    
  }
  isInCart(id:string):boolean{
    return this.cart.value.cartItems.map(ci=>ci.product.id).includes(id)
  }

  addQuantity=(id:number)=>{
    this.get("cartitem/add/"+id)
    .then(res=>this.init())
  }
  reduceQuantity=(id:number)=>{
    this.get("cartitem/retieve/"+id)
    .then(res=>this.init()) 
  }
}

