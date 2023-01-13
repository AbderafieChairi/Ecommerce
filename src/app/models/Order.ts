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

