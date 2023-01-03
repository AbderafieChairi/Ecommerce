import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductData, ProductDataTitle } from 'src/app/models/Product';
import { Col } from 'src/app/components/table/table.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList : ProductData[]=[];
  displayedColumns: Col[]=[]
  constructor(
    private productService :ProductService
  ) { }

  ngOnInit(): void {
    this.productService.productData.subscribe(p=>{
      this.productList=p;
      this.displayedColumns=p?Object.keys(ProductDataTitle).map(i=>{return {col:i,asc:"ASC",sel:false,name:ProductDataTitle[i]}}):[];
    });
    this.productService.getAll();
  }
  tableData:any[]=[];

  setTableData(T:any[]){
    this.tableData=T;
  }
}
