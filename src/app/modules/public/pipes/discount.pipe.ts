import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(items: Product[]|null, maxDiscount:number): Product[] {
    if(!items){
      return []
    }
    return items.filter(product => product.discount && product.discount.value >= maxDiscount);
  }

}
