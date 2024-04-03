import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  getallproduct():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products')
  }
  searchProduct(term:string):Observable <IProduct[]>{
    return this.http
    .get<IProduct[]>(`https://fakestoreapi.com/products`)
    .pipe(
      map((products) => {
        if (!term) {
          console.log("gggggggggggggggggggg");
          return products;
        } else {
          return products.filter((product)=>{
            let titlematch= product.title&& product.title.toLowerCase().includes(term.toLowerCase());
            let categorymatch= product.category&&product.category.toLowerCase().includes(term.toLowerCase());
          })
        
        }
      })
    );

  }
}
