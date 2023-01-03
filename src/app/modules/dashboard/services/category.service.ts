import { Injectable } from '@angular/core';
import { category, categoryData } from 'src/app/models/Category';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categoryList=new BehaviorSubject<categoryData[]>([]);
  constructor() { }



  getAll(){
    fetch("http://10.72.128.43:8080/category")
    .then(res=>res.json())
    .then(json=>{console.log(json);return json})
    .then((json:category[])=>this.categoryList.next(json.map(i=>{
      return {
        id:i.id,
        name:i.name,
        products:5,
        visibility:i.visibility
      }
    })))
  }
}
