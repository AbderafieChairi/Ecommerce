import { Injectable } from '@angular/core';
import { Product, ProductData } from 'src/app/models/Product';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productData = new BehaviorSubject<ProductData[]>([]);
  constructor(private http:HttpClient) { }



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

  getTotalSells():Observable<number>{
    console.log("hehooo")
    return this.http.get<number>("http://localhost:8080/order/totalSells");
   
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
  deleteProduct(id:number){
    console.log("http://localhost:8080/products/delete/"+ id)
    fetch("http://localhost:8080/products/delete/"+ id)
    // .then(res=>window.location.reload())

  }
}
