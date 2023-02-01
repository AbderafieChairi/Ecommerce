import { Product } from "./Product";
import { Tag } from "./Tag";

export interface category{
    id: number,
    name: string,
    products:number
    
}



export interface categoryData{
    id: number,
    name: string,
    products: number,
}

export const CategoryDataTitle:any={
    name: "Category",
    products:"Products",
}