export interface EditProductDto {
    id: number,
    name: string,
    description: string,
    price: number,
    quantity: number,
    discount: number,
    brandId: number,
    imageUrls: string[]
}