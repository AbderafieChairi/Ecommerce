import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface Order{
    id:number;
    subtotal:number;
    total:number;
    orderItems:OrderItem[];
    user : User;
    deliveryType:String;
    deliveryPrice:number;
}
export interface OrderDetail{
    id:number;
    subtotal:number;
    total:number;
    orderItems:OrderItem[];
    user : User;
    state:string;
    deliveryType:String;
    deliveryPrice:number;
    createdAt:Date ;
    items:number;
}


export interface OrderData{
    id:number;
    total:number;
    items:number;
    state:string;
    createdAt:Date;
}


export const OrderDataTitle:any={
    id: "Id",
    total:"Total",
    items:"items",
    state:"state",
    createdAt:"date" 
}