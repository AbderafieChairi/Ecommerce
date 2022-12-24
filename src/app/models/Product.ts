export interface Product {
    id: string;
    name: string;
    prev_cost:number;
    imgUrl:string;
    state:ProductState;
    cost:number;
}


export enum ProductState{
    onSale='on sale',
    new='New',
    outOfStock='Out of stock',
}

export interface ProductDetail{
    id:string;
    category:category;
    rate:number;
    detail:string
}



export interface ProductCart{
    product:Product,
    quantity:number
}


















export enum category{
    Electronics="Electronics",
    Computers="Computers",
    Smart_Home="Smart Home",
    Arts__Crafts="Arts & Crafts",
    Automotive="Automotive",
    Baby="Baby",
    Beauty_and_personal_care="Beauty and personal care",
    Womens_Fashion="Women's Fashion",
    Mens_Fashion="Men's Fashion",
    Girls_Fashion="Girls' Fashion",
    Boys_Fashion="Boys' Fashion",
    Health_and_Household="Health and Household",
    Home_and_Kitchen="Home and Kitchen",
    Industrial_and_Scientific="Industrial and Scientific",
    Luggage="Luggage",
    Movies__Television="Movies & Television",
    Pet_supplies="Pet supplies",
    Software="Software",
    Sports_and_Outdoors="Sports and Outdoors",
    Tools__Home_Improvement="Tools & Home Improvement",
    Toys_and_Games="Toys and Games",
    Video_Games="Video Games"
}









