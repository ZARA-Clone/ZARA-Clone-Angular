export interface IUserListDto {
    items: UserDto[]
    pageIndex: number,
    pageSize: number,
    count: number,
    totalCount: number
}
export class UserDto {
    id?: string
    userName?: string
    email?: string
    phone?: string
    country?: string
    orders?: []
}