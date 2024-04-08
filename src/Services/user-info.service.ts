import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpclient:HttpClient) {
    
   }
   changePass(form:any):Observable<any>{
     return this.httpclient.post<any>("https://localhost:7248/api/UserInfo/changepass",{form})
   }
   changeemail(form:any):Observable<any>{
    return this.httpclient.post<any>("https://localhost:7248/api/UserInfo/ChangeEmail",{form})
   }
   changephoneNum(form:any):Observable<any>{
    return this.httpclient.post<any>("https://localhost:7248/api/UserInfo/ChangePhoneNum",{form})
   }
   getuserinfo():Observable<any>{
    return this.httpclient.get<any>(`${environment.BASEURL}/api/UserInfo/GetUserInfo`);
  }
}
