import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _httpClient: HttpClient) { }

  getAll() {
    return this._httpClient.get(`${environment.BASEURL}`)
  }

  get(id: string) {
    return this._httpClient.get(`${environment.BASEURL}`)

  }
  delete(id: string) {
    return this._httpClient.delete(`${environment.BASEURL}`)
  }
}
