import { Injectable } from '@angular/core';
import { CatalogService } from './catalog.service';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private cs :CategoryService
  ) { }


  init(){
    this.cs.init(); 
  }
}
