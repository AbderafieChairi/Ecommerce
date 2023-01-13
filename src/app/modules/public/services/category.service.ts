import { Injectable } from '@angular/core';
import { category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  async getAll(){
    return fetch("http://localhost:8080/category")
    .then(res=>res.json())
    .then((json:category[])=>{
      console.log(json)
      return json;
    });
  }
  
  async init(){
    this.getAll()
  }
  constructor() { }
}
