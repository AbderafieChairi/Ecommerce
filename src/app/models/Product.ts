import { category } from "./Category";
import { Tag } from "./Tag";

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
    productItemsList:ProdcutItem[];
    discount:discount;
    modifiedAt:Date;
    visiblity:String;
    scheduledDate:Date;
    state:String;
}
interface ProdcutItem{
    isbn:number;
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
    onSale='on sale',
    new='New',
    outOfStock='Out of stock',
}





















