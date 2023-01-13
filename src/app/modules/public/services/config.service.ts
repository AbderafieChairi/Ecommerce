import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private cartService:CartService,
    private categoryService:CategoryService
  ) { }

  async init(){
    await this.cartService.init();
    await this.categoryService.init();
  }
}
