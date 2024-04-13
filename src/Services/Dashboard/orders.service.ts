import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { OrderDto } from '../../Models/Dashboard/Orders/OrderDto';
import { IOrderListDto } from '../../Models/Dashboard/Orders/IOrderListDto';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient: HttpClient) { }
  private URL = `${environment.BASEURL}/dashboard/api/orders`;

  getAll(): Observable<OrderDto[]> {
    return this._httpClient.get<OrderDto[]>(`${this.URL}`)
  }

  getOrderDetails(orderId: number): Observable<OrderDto> {
    return this._httpClient.get<OrderDto>(`${this.URL}/${orderId}`)
  }

  getWithPagination(pageIndex: number, pageSize: number): Observable<IOrderListDto> {
    return this._httpClient.get<IOrderListDto>(`${this.URL}?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }

}
