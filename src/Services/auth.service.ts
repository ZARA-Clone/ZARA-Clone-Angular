import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string="https://localhost:7248/api/Authentication/login";//ha3ml property asasya shayla el link da badal ma akraro kol shwya bs na's klmt login ha3mlha concate 
login(UserData:object):Observable<any>{
  return this._HttpClient.post<any>(this.baseUrl,UserData)
}


}
