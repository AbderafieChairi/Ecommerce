import { Injectable } from '@angular/core';
import { Product, ProductData } from 'src/app/models/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productData = new BehaviorSubject<ProductData[]>([]);
  constructor() { }



  getAll(){
    fetch("http://10.72.128.43:8080/products")
    .then(res=>res.json())
    .then(json=>{console.log(json);return json})
    .then((json:Product[])=>this.productData.next(json.map(i=>{
      return {
        id:i.id,
        category:i.category.name,
        name:i.name,
        price:i.price,
        stock:i.productItemsList.length >0?"In Stock":"Out of Stock",
        thumbnail:i.thumbnail
      }
    })))
  }
}
