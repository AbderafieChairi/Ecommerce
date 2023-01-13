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
    fetch("http://localhost:8080/products")
    .then(res=>res.json())
    .then(json=>{console.log(json);return json})
    .then((json:Product[])=>this.productData.next(json.map(i=>{
      return {
        id:i.id,
        name:i.name ,
        thumbnail:i.thumbnail,
        price:i.price,
        category:i.category.name,
        state:i.state
      }
    })))
  }

  post(endpoint:String,data:any){
    return fetch('http://localhost:8080/'+endpoint,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json; charset=utf8"
      }
    });
  }

  addProduct(product:any){
    this.post('products',product)
    .then(res=>console.log(res))
  }
}
