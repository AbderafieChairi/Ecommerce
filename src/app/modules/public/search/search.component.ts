import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { FormControl } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchItem ='';
  stateCtrl = new FormControl('');
  data : Product[]=[]



    search(){
      if (this.searchItem!=''){
        this.router.navigate(["filter"],{relativeTo: this.route})
        this.data=[];
      }
    }



  constructor(
    private catalogService:CatalogService,
    private categoryService:CategoryService,
    private router:Router,
    private route:ActivatedRoute
    ){}

  async changeSearchItem(){
    this.data = await this.catalogService.filterByName(this.searchItem)
    
  }
  resetsearchItem(){
    this.data=[]
    this.searchItem="";
  }

  ngOnInit(): void {

  }
  toProduct(id:number){
    this.resetsearchItem()
    this.router.navigate(["store","product",id])
  }
}
