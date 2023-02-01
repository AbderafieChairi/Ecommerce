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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { RatingComponent } from 'src/app/components/rating/rating.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatButtonModule } from '@angular/material/button';
import { CategoryComponent } from 'src/app/components/category/category.component';
import { SearchComponent } from './search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProfileComponent } from './profile/profile.component';
import { TableModule } from 'src/app/components/table/table.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { PricePipe } from './pipes/price.pipe';
@NgModule({
  declarations: [
    HomepageComponent,
    ProductdetailsComponent,
    CartComponent,
    IndexComponent,
    SimpleProductComponent,
    RatingComponent,
    FavoritesComponent,
    CategoryComponent,
    SearchComponent,
    CheckoutComponent,
    ProfileComponent,
    OrderComponent,
    DiscountPipe,
    PricePipe,
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
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    NgxSliderModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
})
export class PublicModule {}
