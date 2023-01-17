// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { Product, ProductState } from 'src/app/models/Product';
// import { CartService } from './cart.service';
// @Injectable({
//   providedIn: 'root'
// })
// export class CatalogService {
//   products = new BehaviorSubject<Product []>([]);
//   allproducts = new BehaviorSubject<Product []>([]);
//   searchedItem = new BehaviorSubject<string>("");
//   public page :number =1;
//   productperpage:number=10;
//   constructor() { }

//   setSearchedItem(s:string){
//     this.searchedItem.next(s);
//   }

//   getAllProduct(){
//     fetch("http://localhost:8080/products")
//     .then((res)=>res.json())
//     .then((json:Product[])=>json)
//     .then(data => {this.products.next(data);this.allproducts.next(data);console.log(data)})
            
//   }

//   async getProductById(id:string){
//     let product !:Product;
//     await fetch("http://localhost:8080/products/"+id)
//     .then((res)=>res.json())
//     .then((json:Product)=>product=json)
//     console.log(product)
//     return product
//   }

//   async searchProduct(){

//   }


//   async filtertByName(){
//     const s = this.searchedItem.value
//     // for (const iterator in category) {
//     //   if(s.toLocaleLowerCase()==iterator.toLocaleLowerCase()){
//     //     this.filterbyCategory(s);
//     //     return;
//     //   }
//     // }
//     // if(s=='') this.resetFilter
//     // else 
//     // this.products.next(this.allproducts.value.filter(i=>i.name.toLocaleLowerCase().includes(s.toLocaleLowerCase())))
//     console.log("http://localhost:8080/products/search/"+this.searchedItem.value)
//     return fetch("http://localhost:8080/products/search/"+this.searchedItem.value)
//     .then((res)=>res.json())
//     .then((json:Product[])=>json)
//   }
//   filterbyCategory(category :string){
//     this.searchedItem.next(category)
//     this.products.next(this.allproducts.value);//return from backend
//   }

//   filterbyRate(rate :number){
//     this.products.next(this.products.value);//return from backend
//   }
//   filterbyMark(mark :string){
//     this.products.next(this.products.value);//return from backend
//   }
//   filterbyPrice(min :number,max:number){
//     this.products.next(this.products.value);//return from backend
//   }
//   resetFilter(){
//     this.searchedItem.next('');
//     this.products.next(this.allproducts.value);

//   }
// }



import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Tag } from 'src/app/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  filtertByName: any;
  constructor() {}

  async getAll() {
    const products = await fetch("http://localhost:8080/products")
    .then(res=>res.json()).then((json :Product[])=>{console.log(json);return json})
    return products;
  }
  async getById(id:number) {
    const product = await fetch("http://localhost:8080/products/"+id)
    .then(res=>res.json()).then((json :Product)=>json)
    return product;
  }
  sortProducts(products: Product[], sortCriteria: string) {
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

  filterByDiscount(products: Product[], minDiscount: number) {
    return products.filter(product => {
      return product.discount && product.discount.value >= minDiscount;
    });
  }

  filterByPrice(products: Product[], minPrice: number, maxPrice: number) {
    return products.filter(product => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
  }

  async filterByCategory(category: string) {
      return fetch("http://localhost:8080/products/category/"+category)
      .then(res=>res.json())
      .then((json:Product[])=>json);
  }

  filterByTag(products: Product[], tag: Tag) {
    return products.filter(product => {
      return product.tags.find(x => x.value== tag.value);
    });
  }
  async filterByName(name:string) {
    if(name=="") return [];
    return fetch("http://localhost:8080/products/search/"+name)
    .then(res=>res.json())
    .then(json=>{console.log(json);return json})
    .then((json:Product[])=>json)
  }
}
