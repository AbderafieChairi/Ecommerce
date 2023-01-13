import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { category } from 'src/app/models/Category';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm !: FormGroup;
  constructor(
    private fb:FormBuilder,
    private ps:ProductService,
    private cs: CategoryService
  ){}


  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      details: new FormControl(null, [Validators.required]),
      shortdetails: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      discount: new FormGroup({
        value:new FormControl(null, [Validators.required]),
        startAt:new FormControl(null, [Validators.required]),
        endAt:new FormControl(null, [Validators.required])
      }),
      // category: new FormControl(null, [Validators.required]),
      category: new FormGroup({
        id: new FormControl('', [Validators.required])
      }),
      Tags: this.fb.array([]),
      promoCodes:this.fb.array([]),
      thumbnail: new FormControl(null, [Validators.required]),
      images: this.fb.array([]),
      quantity: new FormControl(null, []),
      visibility: new FormControl(null, []),
      ScheduledDate: new FormControl(null, []),
    });
    this.cs.categories.subscribe(s=>{
      console.log(s);
      this.categories=s
    });
  }
  // Thumbnail promoCodes
  categories : category[]=[];
  selectedTags :String="";
  selectedList :String[]=[];

  submit(){
    console.log(this.addProductForm.value);
    this.ps.addProduct(this.addProductForm.value);
  }

  setTagsError(event:Boolean){
    if(event) this.addProductForm.controls['Tags'].setErrors({'incorrect': true});
    else this.addProductForm.controls['Tags'].setErrors(null);
  }
  setPromoCodeError(event:Boolean){
    if(event) this.addProductForm.controls['promoCodes'].setErrors({'incorrect': true});
    else this.addProductForm.controls['promoCodes'].setErrors(null);
  }

  setSelectedList(entry:String[]){
    this.selectedList=entry;
  }

  get category(){
    return this.addProductForm.controls['category'] as FormGroup
  }


  get Tags(){
    return this.addProductForm.controls['Tags'] as FormArray;
  }
  set Tags(form :FormArray){
    this.addProductForm.controls['Tags'] = form;
  }

  get promoCodes(){
    return this.addProductForm.controls['promoCodes'] as FormArray;
  }
  set promoCodes(form :FormArray){
    this.addProductForm.controls['promoCodes'] = form;
  }

  public get images(){
    return this.addProductForm.controls['images'] as FormArray;
  }
  public get discount(){
    return this.addProductForm.controls['discount'] as FormGroup;
  }
  addImage(){
    const imageForm = this.fb.group({
      url:new FormControl(null, [Validators.required]),
    })
    this.images.push(imageForm);
  }
  changeThumbnail(th : String){
    this.addProductForm.get("Thumbnail")?.setValue(th)
  }
  retrieveImage(index:number){
    const imageForm = this.fb.group({
      url:new FormControl(null, [Validators.required]),
    })
    this.images.removeAt(index);
  }
  changeUrl(form : AbstractControl,url:String){
    form.get('url')?.setValue(url)
  }
}
