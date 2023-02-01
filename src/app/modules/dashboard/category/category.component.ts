import { Component, OnInit} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CategoryDataTitle, categoryData } from 'src/app/models/Category';
import { Col } from 'src/app/components/table/table.component';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit  {
  data: categoryData[]=[];
  displayedColumns: Col[]=[]
  constructor(private categoryService : CategoryService){}


  ngOnInit(): void {
    this.categoryService.categoryList.subscribe(c=>{
      console.log(c);
      this.displayedColumns=c?Object.keys(CategoryDataTitle).map(i=>{return {col:i,asc:"ASC",sel:false,name:CategoryDataTitle[i]}}):[];
      this.data=c
    });
    this.categoryService.getAll();
  }
  tableData:any[]=[];

  setTableData(T:any[]){
    this.tableData=T;
  }
  deletecat(id:number){
    this.categoryService.deletecategory(id);
  }
}
