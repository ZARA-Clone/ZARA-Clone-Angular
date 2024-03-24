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
  GetProductByCatId(catid:number){
    return this.http.get<IproductBrowse>(`/products?CategoryId=${catid}`);
  }
  GetProductById(id:number|undefined): Observable<IproductDetails>{
    return this.http.get<IproductDetails>(`/products/${id}`);
  }
}
