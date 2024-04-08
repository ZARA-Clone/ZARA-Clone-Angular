import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IproductDetails } from '../Models/IproductDetails';
import { IproductBrowse } from '../Models/IproductBrowse';
import { IproductWishList } from '../Models/IproductWishList';

@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  constructor(private http: HttpClient) { }
  
  GetProductByBrandId(brandId: number | undefined): Observable<IproductBrowse[]> {
    return this.http.get<IproductBrowse[]>(`https://localhost:7248/api/Products/brand/${brandId}`);
  }
  
  GetProductById(id: number | undefined): Observable<IproductDetails> {
    return this.http.get<IproductDetails>(`https://localhost:7248/api/Products/${id}`);
  }
  
  AddToCart(productId: number, size: number | undefined): Observable<any> {
    return this.http.get<any>(`https://localhost:7248/api/Cart/AddToCart?productId=${productId}&size=${size}`);
  }
  AddToWishList(productId: number):Observable<any> {
    return this.http.get<any>(`https://localhost:7248/api/WishList/add?productId=${productId}`);
  }
  removeFromWishList(productId: number):Observable<any>{
    return this.http.delete<any>(`https://localhost:7248/api/WishList/delete?productId=${productId}`);
  }
  GetAllWishList():Observable<IproductWishList>{
    return this.http.get<IproductWishList>('https://localhost:7248/api/WishList');
  }
}