import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IUserListDto } from '../../Models/Dashboard/Users/IUser-list-Dto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  private readonly URL = `${environment.BASEURL}/dashboard/api/users`

  getAll() {
    return this._httpClient.get(`${this.URL}`)
  }

  getWithPagintaion(pageIndex: number, pageSize: number): Observable<IUserListDto> {
    return this._httpClient.get<IUserListDto>(`${this.URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }

  get(id: string) {
    return this._httpClient.get(`${this.URL}/${id}`)

  }
  delete(id: string) {
    return this._httpClient.delete(`${this.URL}/${id}`)
  }
}
