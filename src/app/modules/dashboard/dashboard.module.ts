import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import {MatRippleModule} from '@angular/material/core';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicModule } from "../public/public.module";


@NgModule({
    declarations: [
        DashboardComponent,
        ProductsComponent,
        OrdersComponent,
        HomeComponent,
        ProductUpdateComponent,
        NewProductComponent,
    ],
    imports: [
        CommonModule,
        DashBoardRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatMenuModule,
        MatRippleModule,
        ReactiveFormsModule,
    ]
})
export class DashboardModule { }
