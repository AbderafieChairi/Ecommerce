import { Injectable } from '@angular/core';
import { category, categoryData } from 'src/app/models/Category';
import { BehaviorSubject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categoryList=new BehaviorSubject<categoryData[]>([]);
  public categories=new BehaviorSubject<category[]>([]);
  constructor() { 
  }



  getAll(){
    fetch("http://localhost:8080/category")
    .then(res=>res.json())
    .then((json:category[])=>{this.categories.next(json);return json})
    .then((json:categoryData[])=>{this.categoryList.next(json)})
  }
  init(){
    this.getAll()
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

  addCategory(category:any){
    this.post('category',category)
    .then(res=>console.log(res))
  }
  deletecategory(id:number){
    fetch("http://localhost:8080/category/delete/"+ id)
    .then(res=>window.location.reload())

  }


}
