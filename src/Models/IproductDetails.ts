import { SizeQuantity } from "./SizeQuaintity"

export interface IproductDetails{
    id:number
    name:string,
    price:number,
    description:string,
    discount?:number,
    sizes:SizeQuantity[],
    images:string[],
    brandId:number,
    wishlist:boolean
}