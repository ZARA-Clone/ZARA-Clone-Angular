import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient: HttpClient) { }
  private URL = `${environment.BASEURL}/dashboard/api/orders`;

  getAll() {
    return this._httpClient.get(`${this.URL}`)
  }

  getOrderDetails(orderId: number) {
    return this._httpClient.get(`${this.URL}/${orderId}`)
  }

}
