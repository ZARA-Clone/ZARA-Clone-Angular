import { IProductReadDto } from "./IProductReadDto.interface";

export interface IProductsListDto {
    items: IProductReadDto[],
    pageIndex: number,
    pageSize: number,
    count: number,
    totalCount: number
}