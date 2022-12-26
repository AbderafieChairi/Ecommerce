import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { CatalogService } from '../../public/services/catalog.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  product!:Product;

  constructor(private route: ActivatedRoute,
    private catalogService :CatalogService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product = this.catalogService.getProductById(id);
  }

}
