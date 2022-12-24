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
      private cartService:CartService,
      private favoriteService:FavoriteService,
      private router:Router
    ) { }
  ngOnInit(): void {
    this.favoriteService.products.subscribe(ps=>{
      this._inFavorite=this.inFavorite()
    })
  }

  goToDetails(){
    this.router.navigate(
      ['/store/product/', this.product.id]) 
  }
  
  

  AddToFavorite(){
    this.favoriteService.addToFavorite(this.product);
  }
  removeFromFavorite(){
    this.favoriteService.removeFromFavorite(this.product.id);
  }
  inFavorite():boolean{
    return this.favoriteService.inFavorite(this.product.id);
  }
}
