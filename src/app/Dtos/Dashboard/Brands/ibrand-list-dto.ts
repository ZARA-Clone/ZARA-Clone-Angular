import { IBrandDto } from "./IBrandDto.interface";

export interface IBrandListDto {
    items: IBrandDto[],
    pageIndex: number,
    pageSize: number,
    count: number,
    totalCount: number
}
