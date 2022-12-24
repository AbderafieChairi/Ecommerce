import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, ProductDetail, ProductState, category } from 'src/app/models/Product';
import { listProduct, productDetail } from 'src/app/backend/listProuct';
import { CartService } from './cart.service';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  products = new BehaviorSubject<Product []>(listProduct);
  searchedItem = new BehaviorSubject<string>("");
  constructor() { }

  setSearchedItem(s:string){
    this.searchedItem.next(s);
  }

  getAllProduct(){
    this.products.next(listProduct)
  }

  getProductById(id:string){
    return listProduct.filter(i=>i.id==id)[0]
  }
  getProductDetail(id:string) : ProductDetail{
    return productDetail.filter(i=>i.id==id)[0];
  }
  filtertByName(){
    const s = this.searchedItem.value
    for (const iterator in category) {
      if(s.toLocaleLowerCase()==iterator.toLocaleLowerCase()){
        this.filterbyCategory(s);
        return;
      }
    }
    if(s=='') this.resetFilter
    else this.products.next(listProduct.filter(i=>i.name.toLocaleLowerCase().includes(s.toLocaleLowerCase())))
  }
  filterbyCategory(category :string){
    this.searchedItem.next(category)
    this.products.next(listProduct);//return from backend
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
    this.products.next(listProduct);
  }
}
