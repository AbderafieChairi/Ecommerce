import { Component, OnInit,Input } from '@angular/core';


export interface sideSubItem{
  title:string;
  action:Function
}

export interface sideItem{
  icon :string,
  title:string,
  action:Function,
  subItems:sideSubItem[]
} 

@Component({
  selector: 'app-side-item',
  templateUrl: './side-item.component.html',
  styleUrls: ['./side-item.component.scss']
})
export class SideItemComponent implements OnInit {
  @Input() item !:sideItem;
  private expand : boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  switch(){
    this.expand = !this.expand;
  }
  getExpand(){
    return this.expand;
  }
}
