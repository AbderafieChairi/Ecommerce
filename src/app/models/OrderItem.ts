import { Product } from "./Product";

export interface OrderItem{
    id:number;
    quantity:number;
    createdAt:Date;
    modifiedAt:Date;
    product:Product;
    
}