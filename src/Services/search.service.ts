import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';
import { Observable, map } from 'rxjs';
import { IproductBrowse } from '../Models/IproductBrowse';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }
  getallproduct():Observable<IproductBrowse[]>{
    return this.http.get<IproductBrowse[]>('https://localhost:7248/api/Products/getallproducts')
  }
  searchProduct(term:string):Observable <IproductBrowse[]>{
    return this.http
    .get<IproductBrowse[]>(`https://localhost:7248/api/Products/getallproducts`)
    .pipe(
      map((products) => {
        if (!term) {
          return products;
        } else {
          return products.filter((product)=>{
            let titlematch= product.name&& product.name.toLowerCase().includes(term.toLowerCase());
            // let categorymatch= product.category&&product.category.toLowerCase().includes(term.toLowerCase());
            return titlematch;
          })
        
        }
      })
    );

  }
}
