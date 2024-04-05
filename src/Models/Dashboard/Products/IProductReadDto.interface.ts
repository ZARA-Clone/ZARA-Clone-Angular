export interface IProductReadDto {
    id: number,
    name: string,
    description: string,
    price: number,
    discount: number,
    quantity: number,
    brandId: number,
    brandName: string,
    imageUrls: string[],
}
