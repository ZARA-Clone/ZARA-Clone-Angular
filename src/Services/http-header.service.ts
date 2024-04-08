import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Icategory } from '../Models/ICategory';
import { Icartlength } from '../Models/Icartlength';
@Injectable({
  providedIn: 'root'
})
export class HttpHeaderService {

  constructor(private http:HttpClient) { }
  GetAllCat():Observable<Icategory>{
    return this.http.get<Icategory>(`${environment.BASEURL}/api/Header/getallcat`);
  }
  GetAllBrands(catid:number | any):Observable<Icategory>{
    return this.http.get<Icategory>(`${environment.BASEURL}/api/Header/getallbrand?categoryId=${catid}`)
  }
  GetCartLength():Observable<Icartlength>{
    return this.http.get<Icartlength>('https://localhost:7248/api/Header/getcartlength');
  }
}