import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm !: FormGroup;
  constructor(
    private fb:FormBuilder,
    private cs:CategoryService
  ) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }
  save(){
    console.log(this.addCategoryForm.value);
    this.cs.addCategory(this.addCategoryForm.value);
  }
}
