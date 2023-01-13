import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CatalogService } from '../services/catalog.service';
import { category } from 'src/app/models/Category';
import { CategoryService } from '../services/category.service';
import {BehaviorSubject} from 'rxjs'
import { Options } from "@angular-slider/ngx-slider";
enum filter_by{
  new_Product='New Products',
  most_requested='most requested',
  increasing_price='increasing price',
  decreasing_price='decreasing price',
  top_rated='top rated'
}



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products : Product[] = [];
  sortedProduct =new BehaviorSubject<Product[]>([]);
  filteredProduct : Product[] = [];
  minPrice=0;
  maxPrice=100;
  priceOptions: Options = {
    floor: 0,
    ceil: 100,
    step: 10,
    // showTicks: true
  };
  maxDiscount=0;
  discountOptions: Options = {
    ceil: 100,
    step:5,
    showSelectionBar: true,
    selectionBarGradient: {
      from: '#03DAC6',
      to: '#FC0'
    }
  };
  categories : category[]=[];
  discount:number = 0;
  constructor(private catalogService:CatalogService,private categoryService : CategoryService) { }
  public f=filter_by;
  public filterBy:string=filter_by.new_Product;
  GridView:boolean=true;
  
  setFilterBy(f:string){
    this.filterBy=f;
    this.sortedProduct.next(this.catalogService.sortProducts(this.products,f));
    console.log("set sort by")
  }
  setGridView(gv:boolean){
    this.GridView=gv;
  }
  async ngOnInit(): Promise<void> {
    this.products =await this.catalogService.getAll();
    this.sortedProduct.next(this.products)
    this.sortedProduct.subscribe(sp=>{
      this.filteredProduct=sp;
    })
    this.categories = await this.categoryService.getAll();

  }
  next(){
  }
}
