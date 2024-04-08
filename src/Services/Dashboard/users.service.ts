import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  private readonly URL = `${environment.BASEURL}/dashboard/api/users`

  getAll() {
    return this._httpClient.get(`${this.URL}`)
  }

  get(id: string) {
    return this._httpClient.get(`${this.URL}/${id}`)

  }
  delete(id: string) {
    return this._httpClient.delete(`${this.URL}/${id}`)
  }
}
