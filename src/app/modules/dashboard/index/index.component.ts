import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sideItem,sideSubItem } from 'src/app/components/side-item/side-item.component';
import { ConfigService } from '../services/config.service';

// 


@Component({
  selector: 'app-home',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class HomeComponent implements OnInit {
  side :sideItem[]= [
    {
      icon:"space_dashboard",
      action:()=>{this.router.navigate(["dashboard"],{relativeTo: this.route})},
      title:"Dashboard",
      subItems:[
        {
          title:'hhhh',
          action:()=>{console.log("hhhh")}
        }
      ]
    },
    {
      icon:"grid_view",
      action:()=>{},
      title:"Catalog",
      subItems:[
        {
          title:'Category List',
          action:()=>{this.router.navigate(["categorylist"],{relativeTo: this.route})}
        },
        {
          title:'Category',
          action:()=>{this.router.navigate(["addcategory"],{relativeTo: this.route})}
        },
        {
          title:'Product List',
          action:()=>{this.router.navigate(["products"],{relativeTo: this.route})}
        },
        {
          title:'Product',
          action:()=>{this.router.navigate(["addproduct"],{relativeTo: this.route})}
        },
      ]
    },
    {
      icon:"table_view",
      action:()=>{},
      title:"Orders",
      subItems:[
        {
          title:'listOrders',
          action:()=>{this.router.navigate(["orders"],{relativeTo: this.route})}
        }
      ]
    },
  ];
  constructor(
    private router : Router,
    private route:ActivatedRoute,
    private config:ConfigService
  ) { }

  ngOnInit(): void {
    this.config.init();
  }

}
