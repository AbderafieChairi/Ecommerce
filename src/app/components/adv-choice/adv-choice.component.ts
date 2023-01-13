import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { category } from 'src/app/models/Category';








@Component({
  selector: 'app-adv-choice',
  templateUrl: './adv-choice.component.html',
  styleUrls: ['./adv-choice.component.scss']
})
export class AdvChoiceComponent implements OnInit {

  myControl = new FormControl(null, [Validators.required,this.check()]);
  @Input() options: category[]=[];

  
  filteredOptions!: Observable<String[]>;
  @Output() selected = new EventEmitter<number>();
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),map(value => this._filter(value || '')),);
    this.myControl.valueChanges.subscribe(()=>this.selected.emit(
      this.options.filter(i=>i.name==this.myControl.value)[0].id
    ))
    
  }
  
  private _filter(value: String): String[] {
    const filterValue = value.toLowerCase();
    if(this.options?.length >0)
      return this.options.filter(option => option.name.toLowerCase().includes(filterValue)).map(i=>i.name);
    return [];
  }
  check(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null=>{
      const value = control.value;
      if (this._filter(value ||'').length<1){
        return {invalid:true}; 
      }
      return null;
    }
  }
  k(){
    console.log(this.myControl.errors)
  }
}



