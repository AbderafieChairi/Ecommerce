import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  products :Product[]=[];
  constructor(private favoriteService:FavoriteService) { }
  ngOnInit(): void {
    this.favoriteService.products.subscribe(p=>this.products=p)
  }


}
