import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ViewChild,OnInit, Output, EventEmitter,Input} from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  @Input() form !: FormArray;
  @Input() name !:String;
  @Input() max !:number;
  ngOnInit(): void {
    this.fb.array([])
  }
  constructor(private fb : FormBuilder){

  }
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  @ViewChild("chipList") chipList:any;

  fruits:String[] = [];
  @Output() change = new EventEmitter<FormArray>();

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push(value.trim());
      this.addItem(value.trim())
      this.change.emit(this.form);
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    if (this.fruits.length >this.max) {
      this.chipList.errorState = true;
      this.form.setErrors({invalide:true})
    }
  }

  addItem(val:String){
    const item = this.fb.group({
      value:new FormControl(val, []),
    })
    this.form.push(item);
  }

  retrieveImage(index:number){
    this.form.removeAt(index);
    this.change.emit(this.form);

  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
      this.retrieveImage(index);
    }

    if (this.fruits.length <=this.max) {
      this.chipList.errorState = false;
      this.form.setErrors(null)
    }
  }

  setError() {
    this.chipList.errorState = true;
    this.form.setErrors({invalide:true})
  }
}
