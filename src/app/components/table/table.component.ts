
import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';

const sortBy=(T:any,item:string)=>{
	if (typeof T.at(0)[item] =="number"){
		return T.sort((a:any,b:any)=>a[item]-b[item]);
	}
	return T.sort((a:any,b:any)=>a[item].toString().localeCompare(b[item].toString())) 
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Col {
  col:string;
  name:string;
  asc:string;
  sel:boolean;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public _listData!: any[];
  @Input() set listData(value: any[]) {
    this._listData = value;
    if (value.length>0){
      this.Init();
    }
 } 
 get listData():any[]{
    return this._listData;
 }
  @Input() displayedColumns!: Col[];
  data =new BehaviorSubject<any>([]);
  filteredData =new BehaviorSubject<any>(null);
  searchedItem=new BehaviorSubject<string>("");
  end = new BehaviorSubject<number>(3);
  start = new BehaviorSubject<number>(0);
  slicedData !:any; 
  allselected =false;


  @Output() list = new EventEmitter<any[]>();
  constructor() {}
  ngOnInit(): void {
  }
  Init(): void {
    // this.displayedColumns = Object.keys(this._listData[0]).map(i=>{return {col:i,asc:"ASC",sel:false}});
    this.data.next(sortBy(this._listData.map((i,k)=>{return {index:k,sel:false,...i}}),Object.keys(this.listData[0])[0]))
    this.filteredData.next(this.data.value)
    this.slicedData = this.filteredData.value.slice(this.start.value,this.end.value);
    this.end.subscribe(e=>this.update())
    this.start.subscribe(e=>this.update())
    this.searchedItem.subscribe(s=>{
      this.filteredData.next(this.data.value.filter((i:any)=>Object.values(i).filter(i=>i!=null).some((j:any)=>j.toString().includes(this.searchedItem.value))))
    });
    this.filteredData.subscribe(fd=>this.update())
  }
  update(){
    this.slicedData=this.filteredData.value.slice(this.start.value,this.end.value)
    this.list.emit(this.filteredData.value.slice(this.start.value,this.end.value))
  }
  setSortedBy(item:Col){
    this.filteredData.next(sortBy(this.filteredData.value,item.col));
    if (item.asc=='DESC') {
      this.filteredData.next(this.filteredData.value.reverse());
    }
    this.displayedColumns.filter(i=>i==item)[0].asc=item.asc=="ASC"?"DESC":"ASC";
    this.displayedColumns.filter(i=>i==item)[0].sel=true;
    this.displayedColumns.filter(i=>i!=item).forEach(i=>i.sel=false)
    this.update()
  }

  selectAll(){
    console.log("select all")
    this.filteredData.next(this.filteredData.value.map((e:any,i:number) => {
      e.sel = !this.allselected;
      return e
    }));
  }

  onPageChange(event:PageEvent){
    const s =event.pageSize * event.pageIndex;
    let e = s+event.pageSize;
    e = e >this.filteredData.value.length?this.filteredData.value.length:e;
    this.end.next(e);
    this.start.next(s);
  }
}
