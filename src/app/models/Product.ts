import { category } from "./Category";
import { Tag } from "./Tag";
import { promoCode } from "./promoCode";

export interface Product {
    id: number;
    name: String;
    thumbnail:String;
    price:number;
    rating:number;
    category:category;
    tags:Tag[];
    images:Image[];
    details:String;
    shortdetails:String;
    createdAt:Date;
    quantity:number;
    discount:discount;
    modifiedAt:Date;
    visiblity:String;
    scheduledDate:Date;
    state:String;
    promoCodes:promoCode[];
}

export interface discount{
    id:number;
    value:number;
    createdAt:Date;
    modifiedAt:Date;
    endAt:Date;
}


export interface Image{
    id:number;
    url:String;
}
export interface ProductData{
    id:number;
    name: String;
    thumbnail:String;
    price:number;
    category:String;
    state:String;
}
export const ProductDataTitle:any={
    name: "Product",
    category:"Category",
    state:"Stock" , 
    price:'Price'
}
export enum ProductState{
    Available='Available',
    outOfStock='Out of stock',
}





















