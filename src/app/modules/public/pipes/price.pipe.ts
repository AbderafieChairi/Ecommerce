import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(items: Product[]|null, minPrice:number,maxPrice:number): Product[] {
    if(!items){
      return []
    }
    return items.filter(product => product.price >= minPrice && product.price <= maxPrice);
  }

}
