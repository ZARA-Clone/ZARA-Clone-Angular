import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _httpClient: HttpClient) { }

  getAll() {
    return this._httpClient.get(`${environment.BASEURL}/api/Brands`);
  }
  getById(id: number) {
    return this._httpClient.get(`${environment.BASEURL}/api/brands/${id}`);
  }
}
