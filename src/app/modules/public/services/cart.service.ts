import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductCart } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = new BehaviorSubject<ProductCart []>([])
  price = new BehaviorSubject<number>(0)
  constructor() {
    this.products.subscribe(
      args=>{
        this.price.next(args.reduce(
          (i,j)=>i+j.product.cost*j.quantity,0
        ))
      }
    )
  }
  public getProduct(){
    return this.products;
  }
  addToCart(product :Product){
    if(this.products.value.map(i=>i.product.id).includes(product.id)) return ;
    this.products.next([...this.products.value,{product,quantity:1}]);
  }
  retrieveFromCart(id : string){
    this.products.next(
      this.products.value.filter(i=>{
        i.product.id!=id
      })
    )
  }
  changeQuantity(id :string,q:number){
    const out =this.products.value;
    for (let p of out){
      if(p.product.id==id){
        p.quantity+=q;
      }
      
    }
    this.products.next(out.filter(i=>i.quantity>0));
  }

  removeFromCart(id:string){
    this.products.next(this.products.value.filter(i=>i.product.id!=id));
  }

  isInCart(id:string):boolean{
    return this.products.value.map(i=>i.product.id).includes(id);
  }

  addQuantity=(id:string)=>{this.changeQuantity(id,1)}
  reduceQuantity=(id:string)=>{this.changeQuantity(id,-1)}
}

