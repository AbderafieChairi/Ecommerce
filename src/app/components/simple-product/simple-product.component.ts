import { Component, Input, OnInit } from '@angular/core';
import { Product,ProductState } from 'src/app/models/Product';
import { CartService } from 'src/app/modules/public/services/cart.service';
import { FavoriteService } from 'src/app/modules/public/services/favorite.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  styleUrls: ['./simple-product.component.scss']
})
export class SimpleProductComponent implements OnInit {
  @Input() product !:Product;
  public productstate = ProductState;
  public _inFavorite =false
  @Input() defaultView:boolean=false;
  // productDiscount = this.product?Math.round(this.product.reduced_cost/this.product.cost):null;
  Math = Math;
  constructor(
      private router:Router
    ) { }
  ngOnInit(): void {

  }

  goToDetails(){
    this.router.navigate(
      ['/store/product/', this.product.id]) 
  }
  

}
