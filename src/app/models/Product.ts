import { category } from "./Category";
import { Tag } from "./Tag";

export interface Product {
    id: string;
    name: string;
    thumbnail:string;
    price:number;
    rating:number;
    category:category;
    tags:Tag[];
    images:string[];
    details:string;
    shortdetails:string;
    createdAt:Date;
    productItemsList:ProdcutItem[];
    discount:discount;
    modifiedAt:Date;
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
export interface ProductData{
    id:string;
    name: string;
    thumbnail:string;
    price:number;
    category:string;
    stock:string;
}
export const ProductDataTitle:any={
    name: "Product",
    category:"Category",
    stock:"Stock" , 
    price:'Price'
}
export enum ProductState{
    onSale='on sale',
    new='New',
    outOfStock='Out of stock',
}




export interface ProductCart{
    product:Product,
    quantity:number
}
























