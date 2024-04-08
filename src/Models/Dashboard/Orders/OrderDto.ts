import { IProductReadDto } from "../Products/IProductReadDto.interface"

export class OrderDto {
    id?: number
    userId?: string
    orderDate?: Date
    orderProducts?: IProductReadDto[]
    phone?: string
    productsCount?: number
    totalPrice?: number
    userName?: string
}
