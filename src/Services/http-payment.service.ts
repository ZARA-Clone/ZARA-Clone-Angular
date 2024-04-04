import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpPaymentService {

  constructor(private http:HttpClient) { }
  GetOrderDetails():Observable<any>{
    return this.http.get<any>('');
  }
}
