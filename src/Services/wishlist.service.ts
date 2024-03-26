import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  // addtowishlist(prodId:number):Observable<any>{
  //   return this._HttpClient.post('https://fakestoreapi.com/products',{
  //     Id:prodId,
  //   } )
  
  // }


  getwishlistproduct():Observable<IProduct[]>{
    return this._HttpClient.get<IProduct[]>('https://fakestoreapi.com/products')
  }

  removeWishListproduct(prodId:number):Observable<any>{ 
    return this._HttpClient.delete(`https://fakestoreapi.com/products/${prodId}`)
  }

}
