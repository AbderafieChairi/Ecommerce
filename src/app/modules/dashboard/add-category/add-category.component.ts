import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm !: FormGroup;
  constructor(
    private fb:FormBuilder,
    private cs:CategoryService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }
  save(){
    
    this.cs.addCategory(this.addCategoryForm.value);
    this.addCategoryForm.reset();
    this.snackBar.open('Success!', 'Dismiss', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

  }
}
