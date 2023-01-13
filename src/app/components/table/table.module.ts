import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
  ],
  exports:[
    TableComponent
  ]
})
export class TableModule { }
