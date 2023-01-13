import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<CartItem[]>([]);
  price = new BehaviorSubject<number>(0);

  constructor(){
    this.cart.subscribe(ca=>{
      this.price.next(this.countTotalPrice());
    })
  }


  init(){
    console.log("init ....")
    const cart_st = localStorage.getItem("cart")
    if (cart_st==null){
      console.log("create Cart")
      localStorage.setItem("cart",JSON.stringify([]));
    }else{
      this.cart.next(JSON.parse(cart_st))
    }
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
      cartItems.push({ product: product, quantity: 1 });
    }
    this.cart.next(cartItems);
    this.submit()
  }

  addQuantity(productId: number) {
    let cartItems = this.cart.value;
    let cartItem = cartItems.find(x => x.product.id == productId);
    if (cartItem) {
      cartItem.quantity++;
      this.cart.next(cartItems);
    }
    this.submit()
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
    this.submit()
  }

  removeProductFromCart(productId: number) {
    let cartItems = this.cart.value;
    let updatedCartItems = cartItems.filter(x => x.product.id != productId);
    this.cart.next(updatedCartItems);
    this.submit()
  }

  countTotalPrice() {
    let total = 0;
    let cartItems = this.cart.value;
    cartItems.forEach(x => {
      total += x.quantity * x.product.price;
    });
    return total;
  }
}
