import { SizeQuantity } from "./SizeQuaintity";

export interface IproductBrowse{
    id:number,
    name:string,
    price:number,
    imgUrl:string,
    discount?:number,
    sizes:SizeQuantity[],
    brandId:number
}