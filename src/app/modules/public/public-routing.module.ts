import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IndexComponent } from './index/index.component';
// import { ProductFilterComponent } from './product-filter/product-filter.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { AuthGuardService } from 'src/app/service/auth-guard.service';

const routes: Routes = [
    {path:'',component:IndexComponent,children:[
        {path:'cart',component:CartComponent},
        {path:'home',component:HomepageComponent},
        // {path:'filter',component:ProductFilterComponent},
        {path:'favorite',component:FavoritesComponent},
        {path:'checkout',component:CheckoutComponent},
        {path:'order',component:OrderComponent},
        {path:'profile',component:ProfileComponent,canActivate:[AuthGuardService]},
        {path:'product/:id',component:ProductdetailsComponent},
        
    ]}
    
  ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
