import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IproductDetails } from '../Models/IproductDetails';
import { IproductBrowse } from '../Models/IproductBrowse';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  constructor(private http: HttpClient) { }
  GetProductByBrandId(brandid:number):Observable<IproductBrowse[]>{
    return this.http.get<IproductBrowse[]>(`https://localhost:7248/api/Products/brand/${brandid}`);
  }
  GetProductById(id:number|undefined): Observable<IproductDetails>{
    return this.http.get<IproductDetails>(`/products/${id}`);
  }
}