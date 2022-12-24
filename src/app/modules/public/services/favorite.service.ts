import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  products =new BehaviorSubject<Product[]>([]);
  constructor() { }
  addToFavorite(p:Product){
    this.products.next([...this.products.value,p])
  }
  removeFromFavorite(id:string){
    this.products.next(this.products.value.filter(i=>i.id!=id))
  }
  inFavorite(id:string):boolean{
    return this.products.value.map(i=>i.id).includes(id);
  }
}
