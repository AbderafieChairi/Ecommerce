import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product, ProductCart } from 'src/app/models/Product';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/Cart';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products :CartItem[]=[];
  price:number=0;
  constructor(
    private cartService : CartService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.cartService.init();
    this.cartService.cart.subscribe(p=>this.products=p.cartItems)
    this.cartService.price.subscribe(e=>this.price=e)
  }

  addQuantity=(p:number)=>this.cartService.addQuantity(p);
  reduceQuantity=(p:number)=>this.cartService.reduceQuantity(p);
  removeFromCart=(p:number)=>this.cartService.removeFromCart(p);
  toHome=()=>this.router.navigate(['store','home'])
}
