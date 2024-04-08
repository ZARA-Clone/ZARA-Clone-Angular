import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icartlength } from '../Models/Icartlength';

@Injectable({
  providedIn: 'root'
})
export class HttpPaymentService {

  constructor(private http:HttpClient) { }
  GetOrderDetails():Observable<any>{
    return this.http.get<any>('https://localhost:7248/api/Checkout/cartcontent');
  }
  PayOnDelivery():Observable<any>{
    return this.http.get<any>('https://localhost:7248/api/Checkout/Pay-On-Delivery');
  }
}
