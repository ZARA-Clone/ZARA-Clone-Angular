import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

login(UserData:any):Observable<any>{
  return this._HttpClient.post<any>('https://localhost:7248/api/Authentication/login',UserData)
}
}
