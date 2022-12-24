import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { Product, ProductDetail, ProductState } from 'src/app/models/Product';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  public product !:Product;
  public productDetail !:ProductDetail;
  public Math=Math;
  public _inFavorite =false
  public _inCart =false
  public quantity:number=0;

  constructor(
    private route: ActivatedRoute,
    private catalogService :CatalogService,
    private favoriteService:FavoriteService,
    private cartService :CartService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.product = this.catalogService.getProductById(id);
    this.productDetail = this.catalogService.getProductDetail(id);
    this.favoriteService.products.subscribe(ps=>{this._inFavorite=this.inFavorite() })
    this.cartService.products.subscribe(ps=>{
      this._inCart=this.isInCart();
      this.quantity=ps.filter(i=>i.product.id==this.product.id)[0].quantity;
    })
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
  addToCart(){
    this.cartService.addToCart(this.product);
  }
  isInCart(){
    return this.cartService.isInCart(this.product.id);
  }
  retrieveFromCart(){
    this.cartService.retrieveFromCart(this.product.id);
  }
  public addQuantity(){this.cartService.addQuantity(this.product.id)}
  public reduceQuantity(){this.cartService.reduceQuantity(this.product.id)}

}
