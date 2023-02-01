import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  products = new BehaviorSubject<Product[]>([]);
  filteredProducts = new BehaviorSubject<Product[]>([]);
  sortedProducts = new BehaviorSubject<Product[]>([]);
  currentProduct = new BehaviorSubject<Product>({} as Product);
  constructor() {
    this.getAll();
    this.products.subscribe(ps=>{
      // this.filteredProducts.next(ps);
      this.sortedProducts.next(ps);
    })
    // this.filteredProducts.subscribe(fp=>{
    //   this.sortedProducts.next(fp);
    // })
  }

  async getAll() {
    const products = await fetch("http://localhost:8080/products")
    .then(res=>res.json())
    .then((json :Product[])=>this.products.next(json))
  }
  async getById(id:number) {
    const product = await fetch("http://localhost:8080/products/"+id)
    .then(res=>res.json()).then((json :Product)=>this.currentProduct.next(json))
  }
  sortProducts(sortCriteria: string) {
    const _sort=(products: Product[])=>{
      switch (sortCriteria) {
        case 'New Products':
          console.log('New Products')
          return products.sort((a, b) => {
            return b.modifiedAt > a.modifiedAt?1:-1
          });
        case 'most requested':
          console.log('most requested')
          return products.sort((a, b) => {
            return b.rating - a.rating;
          });
        case 'increasing price':
          console.log('increasing price')
          return products.sort((a, b) => {
            return a.price - b.price;
          });
        case 'decreasing price':
          console.log('decreasing price')
          return products.sort((a, b) => {
            return b.price - a.price;
          });
        case 'top rated':
          console.log('top rated')
          return products.sort((a, b) => {
            return b.rating - a.rating;
          });
        default:
          return products;
      }
    }
    this.sortedProducts.next(_sort(this.filteredProducts.value))
  }


  async filterByCategory(category: string) {
      return fetch("http://localhost:8080/products/category/"+category)
      .then(res=>res.json())
      .then(json=>{console.log(json);return json;})
      .then((json:Product[])=>this.products.next(json));
  }

  async filterByName(name:string):Promise<Product[]> {
    if(name=="") return[];
    return fetch("http://localhost:8080/products/search/"+name)
    .then(res=>res.json())
    .then((json:Product[])=>json)
  }
}
