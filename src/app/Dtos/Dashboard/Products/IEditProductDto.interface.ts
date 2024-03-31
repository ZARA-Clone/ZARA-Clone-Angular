import { ProductSize } from "./IAddProductDto.interface";

export interface IEditProductDto {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    discount: number,
    brandId: number,
    imageUrls: string[],
    sizes: ProductSize[]
}