import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductState } from 'src/app/models/Product';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  products = new BehaviorSubject<Product []>([]);
  allproducts = new BehaviorSubject<Product []>([]);
  searchedItem = new BehaviorSubject<string>("");
  public page :number =1;
  productperpage:number=10;
  constructor() { }

  setSearchedItem(s:string){
    this.searchedItem.next(s);
  }

  getAllProduct(){
    fetch("http://10.72.128.43:8080/products")
    .then((res)=>res.json())
    .then((json:Product[])=>json)
    .then(data => {this.products.next(data);this.allproducts.next(data)})
            
  }

  async getProductById(id:string){
    let product !:Product;
    await fetch("http://10.72.128.43:8080/products/"+id)
    .then((res)=>res.json())
    .then((json:Product)=>product=json)
    console.log(product)
    return product
  }

  filtertByName(){
    const s = this.searchedItem.value
    // for (const iterator in category) {
    //   if(s.toLocaleLowerCase()==iterator.toLocaleLowerCase()){
    //     this.filterbyCategory(s);
    //     return;
    //   }
    // }
    // if(s=='') this.resetFilter
    // else 
    // this.products.next(this.allproducts.value.filter(i=>i.name.toLocaleLowerCase().includes(s.toLocaleLowerCase())))
    {
      fetch("http://10.72.128.43:8080/products")
      .then((res)=>res.json())
      .then((json:Product)=>json)
    }
  }
  filterbyCategory(category :string){
    this.searchedItem.next(category)
    this.products.next(this.allproducts.value);//return from backend
  }

  filterbyRate(rate :number){
    this.products.next(this.products.value);//return from backend
  }
  filterbyMark(mark :string){
    this.products.next(this.products.value);//return from backend
  }
  filterbyPrice(min :number,max:number){
    this.products.next(this.products.value);//return from backend
  }
  resetFilter(){
    this.searchedItem.next('');
    this.products.next(this.allproducts.value);
  }
}
