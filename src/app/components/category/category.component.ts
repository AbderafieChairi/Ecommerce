import { Component, OnInit } from '@angular/core';
import { category } from 'src/app/models/Category';
import { CatalogService } from 'src/app/modules/public/services/catalog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categories = [];
  constructor(private catalogService : CatalogService) { }

  ngOnInit(): void {

  }
  searchCatalog(cat:string){
    this.catalogService.filterbyCategory(cat);
  }
}
