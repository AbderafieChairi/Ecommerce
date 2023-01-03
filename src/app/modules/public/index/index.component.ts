import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CatalogService } from '../services/catalog.service';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public searchItem ='';
  test :string='';

  changeSearchItem(){
    this.catalogService.setSearchedItem(this.searchItem)
  }
  resetsearchItem(){
    this.catalogService.resetFilter();
  }

  public nbr:number=0;
  public nbrFav:number=0;
  constructor(
    private cartService:CartService,
    private catalogService: CatalogService,
    private favoriteService:FavoriteService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.catalogService.searchedItem.subscribe(s=>{
      this.searchItem=s;
    });
    this.cartService.cart.subscribe(ps=>this.nbr=ps.cartItems.length);
    this.favoriteService.products.subscribe(ps=>this.nbrFav=ps.length);
  }
  toHome=()=>this.router.navigate(['store','home'])
  researchByName=()=>this.catalogService.filtertByName();
}
