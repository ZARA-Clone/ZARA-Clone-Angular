import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IproductDetails } from '../Models/IproductDetails';
import { IproductBrowse } from '../Models/IproductBrowse';
import { environment } from '../environments/environment';
import { IproductWishList } from '../Models/IproductWishList';


@Injectable({
  providedIn: 'root'
})
export class HttpProductService {

  constructor(private http: HttpClient) { }
  
  GetProductByBrandId(brandId: number | undefined): Observable<IproductBrowse[]> {
    return this.http.get<IproductBrowse[]>(`${environment.BASEURL}/api/Products/brand/${brandId}`);
  }
  
  GetProductById(id: number | undefined): Observable<IproductDetails> {
    return this.http.get<IproductDetails>(`${environment.BASEURL}/api/Products/${id}`);
  }
  
  AddToCart(productId: number, size: number): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/api/Cart/AddToCart`,{productId:productId,size:size});
  }
  AddToWishList(productId: number):Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/api/WishList/add`,productId);
  }
  removeFromWishList(productId: number):Observable<any>{
    return this.http.post<any>(`${environment.BASEURL}/api/WishList/delete`,productId);
  }
  GetAllWishList():Observable<IproductWishList>{
    return this.http.get<IproductWishList>('https://localhost:7248/api/WishList');
  }
}