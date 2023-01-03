import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CatalogService } from '../services/catalog.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products : Product[] = [];
  constructor(private catalogService:CatalogService) { }
  public page :number = this.catalogService.page;
  ngOnInit(): void {
    this.catalogService.getAllProduct();
    this.catalogService.products.subscribe(p=>this.products=p);
  }
  next(){
    this.catalogService.page+=1;
    this.catalogService.getAllProduct();
  }

}
