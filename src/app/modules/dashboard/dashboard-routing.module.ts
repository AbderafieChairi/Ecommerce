import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    {path:'',component:HomeComponent,children:[
        {path:'products',component:ProductsComponent,
        children: [
          {path: 'update/:id',component: ProductUpdateComponent},
          
        ]},
        {path:'create',component:NewProductComponent },
        {path:'orders',component:OrdersComponent},
        {path:'dashboard',component:DashboardComponent},
      ]},
  ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
