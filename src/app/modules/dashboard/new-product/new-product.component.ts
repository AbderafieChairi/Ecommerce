import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CatalogService } from '../../public/services/catalog.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  productform!:FormGroup;
  productPreview$!:Observable<Product>;
  urlRegex!:RegExp;
Math = Math;;

  constructor(private formBuilder: FormBuilder,private catalogService:CatalogService,private router:Router) { }

  ngOnInit(): void {
    this.productform=this.formBuilder.group({
      name:[null],
      description:[null],
      imgUrl:[null],
      cost:[null]

    },
    {
      updateOn:'blur'
    });

    this.productPreview$=this.productform.valueChanges.pipe(
      map(formValue=>({
        ...formValue,
        id:0,
        prev_cost:0,
        createdDate:new Date()
      }))
    )
  }

  onSubmitForm(){
    // this.catalogService.add;
    // this.router.navigateByUrl("/products");
  }
 

}

