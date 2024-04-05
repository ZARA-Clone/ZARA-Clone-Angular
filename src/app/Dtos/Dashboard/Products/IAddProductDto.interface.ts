export class AddProductDto {
    name: string = '';
    price: number = 0;
    discount = 0;
    brandId = 0;
    description: string = '';
    imageUrls: string[] = [];
    sizes: ProductSize[] = []
}

export class ProductSize {
    key!: string
    value: number = 0
}

export enum Size {
    small = 1,
    medium = 2,
    large = 3,
    xLarge = 4
}
