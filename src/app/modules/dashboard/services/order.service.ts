import { Injectable } from '@angular/core';
import {Order, OrderDataAdmin, OrderDetail} from '../../../models/Order'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  async get(endpoint:String){
    return fetch('http://localhost:8080/'+endpoint)
  }



  async getorders(){
    const res = await this.get("order");
    const json = await res.json();
    const data = json.map((i: any) => ({
      ...i,
      ['username']: i.user.name,
      ['items']: i.orderItems.length
    }));
    return data;
  }
  async getOrderbyId(id:number){
    return this.get("order/"+id)
    .then(res=>res.json())
    .then((json:OrderDetail)=>json)
  }
  async deleteOrder(id:number){
    const res = await this.get("order/delete/" + id);
    return await res.json();
  }

}
