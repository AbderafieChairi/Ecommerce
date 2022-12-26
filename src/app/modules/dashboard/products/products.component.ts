import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CatalogService } from '../../public/services/catalog.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsList!:BehaviorSubject<Product[]>;

  constructor(private catalogService:CatalogService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.productsList=this.catalogService.getAllProduct();

  }
  onClick(p:Product){
    this.router.navigate([`update/${p.id}`],{relativeTo: this.route});


  }

}
