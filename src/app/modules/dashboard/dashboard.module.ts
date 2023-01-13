import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './index/index.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { DashBoardRoutingModule } from './dashboard-routing.module';
import {MatRippleModule} from '@angular/material/core';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SideItemComponent } from 'src/app/components/side-item/side-item.component';
import { MultipleChoiceComponent } from 'src/app/components/multiple-choice/multiple-choice.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import { AdvChoiceComponent } from 'src/app/components/adv-choice/adv-choice.component';
import {MatRadioModule} from '@angular/material/radio';
import { UploadComponent } from 'src/app/components/upload/upload.component';
import {MatChipsModule} from '@angular/material/chips';
import { TableModule } from 'src/app/components/table/table.module';
@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    HomeComponent,
    AddProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    SideItemComponent,
    MultipleChoiceComponent,
    AdvChoiceComponent,
    UploadComponent,

    
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
    MatTableModule,
    FormsModule,

    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatChipsModule,
    TableModule
  ]
})
export class DashboardModule { }
