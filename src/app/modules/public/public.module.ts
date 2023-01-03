import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CartComponent } from './cart/cart.component';
import { IndexComponent } from './index/index.component';
import { PublicRoutingModule } from './public-routing.module';
import { SimpleProductComponent } from '../../components/simple-product/simple-product.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatButtonModule } from '@angular/material/button';
import { CategoryComponent } from 'src/app/components/category/category.component';
@NgModule({
  declarations: [
    HomepageComponent,
    ProductdetailsComponent,
    CartComponent,
    IndexComponent,
    SimpleProductComponent,
    PaymentComponent,
    ProductFilterComponent,
    RatingComponent,
    FavoritesComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    MatSliderModule,
    MatBadgeModule,
    MatButtonModule,
  ],
  providers: [],
})
export class PublicModule {}
