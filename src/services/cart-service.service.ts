import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icart } from '../Models/icart';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  

  



    private apiUrl = 'http://localhost:5098/api/Cart'; // Your cart API URL
  
    constructor(private http: HttpClient) { }
  


    getCartItems(userId: string): Observable<Icart[]> {
      return this.http.get<Icart[]>(`https://localhost:7248/api/Cart/${userId}`);
    }
    

   

    checkAvailability(productId: number, size: number): Observable<number> {
      return this.http.get<number>(`https://localhost:7248/api/Cart/check-availability/${productId}/${size}`);
    }


    updateProductQuantity(userId: string, productId: number, quantity: number, size: number): Observable<any> {
      return this.http.put(`https://localhost:7248/api/cart/update-quantity/${userId}/${productId}?quantity=${quantity}&size=${size}`, {});
    }
    
  
   

    deleteItem(userId: string, productId: number ,size: number): Observable<void> {
      return this.http.delete<void>(`https://localhost:7248/api/cart/delete-item/${userId}/${productId}/${size}`);
    }




    addtowishlist(productId: number, userId: number): Observable<any> {
      const wishlistitem = {
        userId: userId,
        productId: productId
     
      };
    
      return this.http.post<any>('http://localhost:5098/api/AddToWishlist', wishlistitem);
    }
}


