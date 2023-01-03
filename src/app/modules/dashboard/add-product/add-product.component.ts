import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {FormArray, FormControl, FormGroup, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductForm !: FormGroup;
  constructor(
    private fb:FormBuilder
  ){}


  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required]),
      thumbnail: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      discount: new FormGroup({
        value:new FormControl(null, [Validators.required]),
        StartAt:new FormControl(null, [Validators.required]),
        EndAt:new FormControl(null, [Validators.required])
      }),
      category: new FormControl(null, [Validators.required]),
      Tags: new FormControl([], []),
      promoCodesList: new FormControl([], []),
      Thumbnail: new FormControl(null, [Validators.required]),
      images: this.fb.array([]),
      productItems: new FormControl([], []),
      visibility: new FormControl(null, []),
      ScheduledDate: new FormControl(null, []),

    });
  }
  // Thumbnail promoCodesList
  categories : String[]=["Power tools","Screwdrivers","Chainsaws","Hand tools","Machine tools","Power machinery","Measurements"]
  selectedTags :String="";
  selectedList :String[]=[];

  submit(){
    console.log(this.addProductForm.value)
  }

  setTagsError(event:Boolean){
    if(event) this.addProductForm.controls['Tags'].setErrors({'incorrect': true});
    else this.addProductForm.controls['Tags'].setErrors(null);
  }
  setPromoCodeError(event:Boolean){
    if(event) this.addProductForm.controls['promoCodesList'].setErrors({'incorrect': true});
    else this.addProductForm.controls['promoCodesList'].setErrors(null);
  }

  setSelectedList(entry:String[]){
    this.selectedList=entry;
  }
  get productItems(){
    return this.addProductForm.controls['productItems'].value.length;
  }
  set productItems(productItems :Number){
    this.addProductForm.controls['productItems'].setValue(
      [...Array(productItems).keys()].map(i=>{return {
        isbn:(Math.random() + 1).toString(36).substring(2)
      }})
    )
    // return this.addProductForm.controls['productItems'].value.length;
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
