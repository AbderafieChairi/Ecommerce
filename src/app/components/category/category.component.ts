import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CatalogService } from 'src/app/modules/public/services/catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  // public categories : Product = [];
  constructor(private catalogService : CatalogService) { }

  ngOnInit(): void {

  }
  searchCatalog(cat:string){
    // const products:Product[] = this.catalogService.getProducts(); 
    // this.categories = this.catalogService.filterByCategory(products,cat);
  }
}
