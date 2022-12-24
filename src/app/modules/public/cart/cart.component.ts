import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product, ProductCart } from 'src/app/models/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products :ProductCart[]=[];
  price:number=0;
  constructor(
    private cartService : CartService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.cartService.products.subscribe(p=>this.products=p)
    this.cartService.price.subscribe(e=>this.price=e)
  }

  addQuantity=(p:string)=>this.cartService.addQuantity(p);
  reduceQuantity=(p:string)=>this.cartService.reduceQuantity(p);
  removeFromCart=(p:string)=>this.cartService.removeFromCart(p);
  toHome=()=>this.router.navigate(['store','home'])
}
