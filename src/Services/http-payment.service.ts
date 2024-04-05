import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpPaymentService {

  constructor(private http:HttpClient) { }
  GetOrderDetails():Observable<any>{
    return this.http.get<any>('https://localhost:7248/api/Checkout/cartcontent');
  }
  payload = { date: new Date() };
  PayOnDelivery():Observable<any>{
    return this.http.post<any>('https://localhost:7248/api/Checkout/Pay-On-Delivery',{ date: new Date() });
  }
}
