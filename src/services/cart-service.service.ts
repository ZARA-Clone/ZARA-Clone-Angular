import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icart } from '../Models/icart';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  
 /* apiUrl = this.url+'/api/Signup'; 
  checkEmailExists(userData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/checkEmailExists`, userData);
  }*/
  

  url:string=environment.BASEURL

    private apiUrl = this.url; // Your cart API URL
  
    constructor(private http: HttpClient) { }
  


    getCartItems(userId: string): Observable<Icart[]> {
      console.log(userId)
      return this.http.get<Icart[]>(`${environment.BASEURL}/api/Cart/${userId}`);
    }
    

   

    checkAvailability(productId: number, size: number): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/api/Cart/check-availability/${productId}/${size}`);
    }


    updateProductQuantity(userId: string, productId: number, quantity: number, size: number): Observable<any> {
      console.log(`${this.apiUrl}/api/cart/update-quantity/${userId}/${productId}?quantity=${quantity}&size=${size}`);
      return this.http.put(`${this.apiUrl}/api/cart/update-quantity/${userId}/${productId}?quantity=${quantity}&size=${size}`, {});
    }
    
  
   

    deleteItem(userId: string, productId: number ,size: number): Observable<void> {
      console.log(`${this.apiUrl}/api/cart/delete-item/${userId}/${productId}/${size}`)
      return this.http.delete<void>(`${this.apiUrl}/api/cart/delete-item/${userId}/${productId}/${size}`);
    }


//----------------------WishList--------------------//

    addtowishlist(productId: number, userId: string): Observable<any> {
      const wishlistitem = {
        userId: userId,
        productId: productId
     
      };
    
      return this.http.post<any>(`${this.apiUrl}/api/AddToWishlist`, wishlistitem);
    }



    removefromwishlist(productId:number,userId:string):Observable<any>{
     
         return this.http.delete<void>(`${this.apiUrl}/api/AddToWishlist?productId=${productId}&userId=${userId}`);
    }


  
    checkwish(itemId: number, userId: string): Observable<boolean> {
      
      return this.http.get<boolean>(`${this.apiUrl}/api/AddToWishlist/checkwish/${itemId}/${userId}`);
    }
    



}


