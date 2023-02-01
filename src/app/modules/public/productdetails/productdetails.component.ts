import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { Product, ProductState } from 'src/app/models/Product';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  public loading = true;

  public product :Product={} as Product;
  public images: String[]=[];
  public selectedImage=0;
  public Math=Math;
  public _inFavorite =false
  public _inCart =false
  public quantity:number=0;

  constructor(
    private route: ActivatedRoute,
    private catalogService :CatalogService,
    private favoriteService:FavoriteService,
    private cartService :CartService,
    private router:Router
  ) { 
    this.catalogService.currentProduct.subscribe(p=>this.product=p);
  }

  async ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    await this.catalogService.getById(id);
    this.loading=false;
    this.favoriteService.products.subscribe(ps=>{this._inFavorite=this.inFavorite() })
    this.cartService.cart.subscribe(ps=>{
      if (ps != undefined){
        this._inCart=ps?.map(ci=>ci.product.id).includes(id)
        this.quantity=ps?.filter(i=>i.product.id==this.product.id)[0]?.quantity;
      }
    })
  }
  setImages(){
    this.images.push(this.product.thumbnail)
    this.product.images.forEach(i=>this.images.push(i.url))
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
    this.cartService.addProductToCart(this.product);
  }

  retrieveFromCart(){
    // this.cartService.removeFromCart(this.product.id);
  }
  toCategory(category:String){
    this.router.navigate(["store","home"],{
      queryParams:{category}
    })
  }
}
