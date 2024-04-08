import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }



  getwishlistproduct():Observable<IProduct[]>{
    return this._HttpClient.get<IProduct[]>('https://localhost:7248/api/WishList')
  }

  removeWishListproduct(prodId:number):Observable<any>{ 
    return this._HttpClient.delete(`https://localhost:7248/api/WishList/delete?productId=${prodId}`)
  }

  
}