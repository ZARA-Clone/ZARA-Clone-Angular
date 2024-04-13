import { OrderDto } from "./OrderDto";

export interface IOrderListDto {
    items: OrderDto[],
    pageIndex: number,
    pageSize: number,
    count: number,
    totalCount: number
}