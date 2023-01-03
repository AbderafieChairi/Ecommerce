import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ViewChild,OnInit, Output, EventEmitter,Input} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  @Input() name !:String;
  @Input() max !:number;
  ngOnInit(): void {
    
  }
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  @ViewChild("chipList") chipList:any;

  fruits:String[] = [];
  @Output() change = new EventEmitter<String []>();
  @Output() state = new EventEmitter<Boolean>();

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.fruits.push(value.trim());
      this.change.emit(this.fruits)
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }

    if (this.fruits.length >this.max) {
      this.chipList.errorState = true;
      this.state.emit(true)
    }

  }

  remove(fruit: any): void {
    let index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    if (this.fruits.length <=this.max) {
      this.chipList.errorState = false;
      this.state.emit(false)
    }
  }

  setError() {
    this.chipList.errorState = true;
    this.state.emit(true)
  }
}
