import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from '../services/catalog.service';
import { Product, ProductState } from 'src/app/models/Product';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  public loading = new BehaviorSubject<Boolean>(true);
  public product !:Product;
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

  async ngOnInit() {
    await this.cartService.init()
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loading.next(true)
    this.catalogService.getProductById(id).then(p=>{this.loading.next(false);this.product = p})
    this.favoriteService.products.subscribe(ps=>{this._inFavorite=this.inFavorite() })
    this.cartService.cart.subscribe(ps=>{
      if (ps!={}as Cart){
        console.log(ps);
        console.log(ps.cartItems.map(ci=>ci.product.id.toString()).includes(id));
        this._inCart=ps.cartItems.map(ci=>ci.product.id.toString()).includes(id)
        this.quantity=ps.cartItems.filter(i=>i.product.id==this.product.id)[0].quantity;
      }
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
    // this.cartService.removeFromCart(this.product.id);
  }

}
