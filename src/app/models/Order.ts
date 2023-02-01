import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface Order{
    id:number;
    total:number;
    orderItems:OrderItem[];
    user : User;
    createdAt:Date ;
}
export interface OrderDetail{
    id:number;
    total:number;
    orderItems:OrderItem[];
    createdAt:Date ;
    items:number;
    user : User;
}


export interface OrderData{
    id:number;
    total:number;
    items:number;
    createdAt:Date;
}
export interface OrderDataAdmin{
    id:number;
    total:number;
    items:number;
    username:String;
    createdAt:Date;
}


export const OrderDataTitle:any={
    id: "Id",
    total:"Total",
    items:"items",
    createdAt:"date" 
}

export const OrderDataAdminTitle:any={
    id: "Id",
    total:"Total",
    items:"items",
    username:"username",
    createdAt:"date" 
}