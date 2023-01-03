import { Product } from "./Product";

export interface Cart{
    id:number,
    cartItems:CartItem[],
    createdAt:Date,
    modifiedAt:Date
}


export interface CartItem{
    id:number;
    createdAt:Date;
    modifiedAt:Date;
    quantity:number;
    product:Product

}