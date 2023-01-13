import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CatalogService } from '../services/catalog.service';
import { FavoriteService } from '../services/favorite.service';
import { Router } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {


  public chat:boolean=false;
  public nbr:number=0;
  public nbrFav:number=0;
  constructor(
    private cartService:CartService,
    private catalogService: CatalogService,
    private favoriteService:FavoriteService,
    private router:Router,
    private config :ConfigService, 

    ) { }
  changeChat(){
    this.chat=!this.chat
  }
  async ngOnInit(): Promise<void> {
    await this.config.init();

    this.cartService.cart.subscribe(ps=>this.nbr=ps!= undefined ? ps.length:0);
    // this.favoriteService.products.subscribe(ps=>this.nbrFav=ps.length);
  }
  toHome=()=>this.router.navigate(['store','home'])
  researchByName=()=>this.catalogService.filtertByName();
}
