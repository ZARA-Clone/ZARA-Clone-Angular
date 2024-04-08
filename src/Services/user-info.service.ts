import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpclient:HttpClient , private router:Router) {
    
   }
 
  changePass(form: any): Observable<any> {
    const { Currentpassword, Newpassword } = form;
    const requestData = {
      Currentpassword,
      Newpassword
    };
    return this.httpclient.post<any>(`${environment.BASEURL}/api/UserInfo/ChangePass`, requestData);
  }

  changeEmail(form: any): Observable<any> {
    console.log(form);
    return this.httpclient.post<any>(`${environment.BASEURL}/api/UserInfo/ChangeEmail`, form);
  }

  changePhoneNumber(form: any): Observable<any> {
    console.log(form);
    return this.httpclient.post<any>(`${environment.BASEURL}/api/UserInfo/ChangePhoneNum`, form);
  }getuserinfo():Observable<any>{
    return this.httpclient.get<any>(`${environment.BASEURL}/api/UserInfo/GetUserInfo`);
  }

    //get username,email,phonenumber from token
  extractUserInfoFromToken() {
   
    const token = localStorage.getItem('token');
  console.log("Token:", token); 
  if (token) {
    const tokenParts = token.split('.');
    console.log("Token Parts:", tokenParts); 
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log("Payload:", payload); 

      // Extract email, phone, and username from the payload
      const email = payload ? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] : null;
      const phone = payload ? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone']  : null;
      const username = payload ? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']  : null;

      return { email, phone, username};
    }
  }
  return null;
  }


  signOut(): void
 
   {
    localStorage.removeItem('token');
  }
  

  redirectToLogin(): void {
    if (!this.isTokenAvailable()) {
      this.router.navigate(['/signin']);
    }
  }

  isTokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }
}


