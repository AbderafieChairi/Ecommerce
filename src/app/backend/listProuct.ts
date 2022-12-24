import { Product,ProductDetail,ProductState, category } from "src/app/models/Product";

export const listProduct :Product[]=[
    {
        id:'123123',
        name:'Product 1',
        cost:20,
        imgUrl:'https://ma.jumia.is/cms/000_2022/Z-Categories/2-Telephonie/22-AccessoiresTel/220/4.jpg',
        state:ProductState.onSale,
        prev_cost:25,
    
    },
    {
        id:'65432',
        name:'Airphone',
        cost:23,
        imgUrl:'https://ma.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/30/626144/1.jpg?2632',
        state:ProductState.new,
        prev_cost:35,
    
    },
    {
        id:'9191',
        name:'LapTop',
        cost:50,
        imgUrl:'https://ma.jumia.is/cms/000_2022/Z-Categories/2-Telephonie/22-AccessoiresTel/220/9.jpg',
        state:ProductState.outOfStock,
        prev_cost:150,
    
    },

]



export const productDetail :ProductDetail[]=[
    {
        id:'123123',
        category:category.Beauty_and_personal_care,
        detail:"Le PC portable Dell XPS 13-9305 (9305-670) allie parfaitement un design compact et élégant avec des performances supérieures. En plus de son écran Full HD, ce modèle vous propose une utilisation à la hauteur de vos attentes grâce à son processeur Intel Core i5-1165G7, ses 16 Go de mémoire DDR4 et son SSD M.2 PCIe de 512 Go. Découvrez les possibilités offertes par les ports Thunderbolt 4 / USB-C 3.1 Type C et appréciez un look raffiné doté d'une conception soignée.",
        rate:3
    },
    {
        id:'65432',
        category:category.Electronics,
        detail:"Le PC portable Dell XPS 13-9305 (9305-670) allie parfaitement un design compact et élégant avec des performances supérieures. En plus de son écran Full HD, ce modèle vous propose une utilisation à la hauteur de vos attentes grâce à son processeur Intel Core i5-1165G7, ses 16 Go de mémoire DDR4 et son SSD M.2 PCIe de 512 Go. Découvrez les possibilités offertes par les ports Thunderbolt 4 / USB-C 3.1 Type C et appréciez un look raffiné doté d'une conception soignée.",
        rate:3
    },
    {
        id:'9191',
        category:category.Beauty_and_personal_care,
        detail:"Le PC portable Dell XPS 13-9305 (9305-670) allie parfaitement un design compact et élégant avec des performances supérieures. En plus de son écran Full HD, ce modèle vous propose une utilisation à la hauteur de vos attentes grâce à son processeur Intel Core i5-1165G7, ses 16 Go de mémoire DDR4 et son SSD M.2 PCIe de 512 Go. Découvrez les possibilités offertes par les ports Thunderbolt 4 / USB-C 3.1 Type C et appréciez un look raffiné doté d'une conception soignée.",
        rate:3
    },
]