import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct } from '../models/iproduct';
@Injectable({
  providedIn: 'root'
})
export class HttpproductsService {

  constructor(private http: HttpClient) { }
  httpHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  getallproduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products')
  }

  searchProducts(searchText: string , selectcategory:string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(`https://fakestoreapi.com/products`)
      .pipe(
        map((products) => {
          if (!searchText) {
            return products;
          } else {
            return products.filter((product)=>{
              let titlematch= product.title&& product.title.toLowerCase().includes(searchText.toLowerCase());
              let categorymatch= product.category&&product.category.toLowerCase().includes(searchText.toLowerCase());
            })
          
          }
        })
      );
  }
}

