import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  products =new BehaviorSubject<Product[]>([]);
  constructor() { 
  }
  addToFavorite(p:Product){
    this.products.next([...this.products.value,p])
  }
  removeFromFavorite(id:number){
    console.log("remove from favorite")
    console.log(this.products.value)
    this.products.next(this.products.value.filter(i=>i.id!=id))
    console.log(this.products.value.filter(i=>i.id!=id))
  }
  inFavorite(id:number):boolean{
    if (this.products.value.length==0) return false;
    return this.products.value.map(i=>i.id).includes(id);
  }
}
