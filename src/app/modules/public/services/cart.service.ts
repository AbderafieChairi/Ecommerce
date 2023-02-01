import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>(this.cartStorage);
  price = new BehaviorSubject<number>(0);
  get cartStorage(){
    const cart_st = localStorage.getItem("cart");
    return cart_st!=null ? JSON.parse(cart_st):[];
  }
  set cartStorage(cart:any){
    localStorage.setItem("cart",JSON.stringify(cart));
  }
  constructor(){
    this.cart.subscribe(ca=>{
      this.price.next(this.countTotalPrice());
      this.cartStorage=ca;
    })
  }
  resetCart(){
    this.cart.next([]);
  }

  init(){
  }
  submit(){
    localStorage.setItem("cart",JSON.stringify(this.cart.value))
  }

  addProductToCart(product: Product) {
    let cartItems = this.cart.value;
    let cartItem = cartItems.find(x => x.product.id == product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cartItems.push({ product: product, quantity: 1,hasReduce:false });
    }
    this.cart.next(cartItems);
  }

  addQuantity(productId: number) {
    let cartItems = this.cart.value;
    let cartItem = cartItems.find(x => x.product.id == productId);
    if (cartItem) {
      cartItem.quantity++;
      this.cart.next(cartItems);
    }
  }

  reduceQuantity(productId: number) {
    let cartItems = this.cart.value;
    let cartItem = cartItems.find(x => x.product.id == productId);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity == 0) {
        this.removeProductFromCart(productId);
      } else {
        this.cart.next(cartItems);
      }
    }
  }

  removeProductFromCart(productId: number) {
    let cartItems = this.cart.value;
    let updatedCartItems = cartItems.filter(x => x.product.id != productId);
    this.cart.next(updatedCartItems);
  }

  countTotalPrice() {
    let total = 0;
    let cartItems = this.cart.value;
    cartItems.forEach(x => {
      total += x.quantity * x.product.price;
    });
    return total;
  }


  checkPromoCode(promocode : string){
    const c = this.cart.value;
    c.forEach(cartitem=>{
      if (cartitem.product.promoCodes.some(pcode=>pcode.value==promocode&&cartitem.hasReduce==false)){
        cartitem.hasReduce = true;
        cartitem.product.price = cartitem.product.price*0.9;
      }
    })
    this.cart.next(c)
    this.price.next(this.countTotalPrice());
  }
}
