import { Product } from "./Product";
import { Tag } from "./Tag";

export interface category{
    id: number,
    name: string,
    tags: Tag[],
    parentCategory: category[],
    visibility: string,
    startAt: string
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