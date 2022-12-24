import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../services/catalog.service';
import { Product } from 'src/app/models/Product';

enum filter_by{
  new_Product='New Products',
  most_requested='most requested',
  increasing_price='increasing price',
  decreasing_price='decreasing price',
  top_rated='top rated'
}

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  products :Product[]=[];
  searchItem : any;
  minprice:number=0;
  maxprice:number=0;
  public f=filter_by;
  public filterBy:string=filter_by.new_Product;
  GridView:boolean=true;
  
  setFilterBy(f:string){
    this.filterBy=f;
  }
  setGridView(gv:boolean){
    this.GridView=gv;
  }
  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.searchedItem.subscribe(s=>this.searchItem=s);
    this.catalogService.products.subscribe(s=>this.products=s);
  }
  changeSearchItem(){
    this.catalogService.setSearchedItem(this.searchItem)
  }
  setMinPrice(e:number){this.minprice=e}

  filterbyCategory(category :string){
    console.log('filterbyCategory(category :string)')
    this.catalogService.filterbyCategory(category)
  }

  filterbyRate(rate :number){
    this.catalogService.filterbyRate(rate)
  }
  filterbyMark(mark :string){
    this.catalogService.filterbyMark(mark)
  }
  filterbyPrice(min :number,max:number){
    this.catalogService.filterbyPrice(min,max)
  }
  resetFilter(){
    this.catalogService.resetFilter()
  }
}
