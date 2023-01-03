import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './index/index.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
    {path:'',component:HomeComponent,children:[
        {path:'products',component:ProductsComponent},
        {path:'addproduct',component:AddProductComponent},
        {path:'orders',component:OrdersComponent},
        {path:'dashboard',component:DashboardComponent},
        {path:'categorylist',component:CategoryComponent},
        {path:'addcategory',component:AddCategoryComponent}
    ]},
  ]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
