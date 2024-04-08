export interface IUserListDto {
    items: IUserDto[]
    pageIndex: number,
    pageSize: number,
    count: number,
    totalCount: number
}
export interface IUserDto {
    id: string
    userName: string
    email: string
    phone: string
    country: string
    orders: []
}