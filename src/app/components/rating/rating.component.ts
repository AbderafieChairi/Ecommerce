import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() display:boolean=true;
  @Input() rating:number =2;
  rates = [...Array(5).keys()];
  clicked = false;
  constructor() { }

  public changeRating(r:number){
    if(this.clicked) return;
    this.rating=r;
    console.log("hhh")
  }
  click(){this.clicked=true;}
  refresh(){this.clicked=false;}
  ngOnInit(): void {
  }

}
