import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuserdata } from '../Models/iuserdata';
import emailjs from '@emailjs/browser';
import { environment } from '../environments/environment';
// import emailjs from '@emailjs/browser';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',

})
export class UserService {
 
  url:string=environment.BASEURL
 private verificationCode :string='';
 private userdata:Iuserdata|null=null;

 setuserdata(userData:Iuserdata):void{ //array
  this.userdata=userData
 }

 getuserdata():Iuserdata|null
 {
    return this.userdata;
 }










  private verificationCodes: { [email: string]: { code: string, expiresAt: number } } = {};
  private verificationCodeExpirationDuration: number = 15 * 60 * 1000; // 15 minutes in milliseconds

  setVerificationCode(email: string, code: string): void {
    // Associate the verification code with the user's email and expiration time
    const expiresAt = Date.now() + this.verificationCodeExpirationDuration;
    this.verificationCodes[email] = { code, expiresAt };
  }

  getVerificationCode(email: string): string | undefined {
    const verificationData = this.verificationCodes[email];
    if (verificationData && verificationData.expiresAt > Date.now()) {
      // Check if the verification code is still valid 
      return verificationData.code;
    }
    // If the verification code has expired or doesn't exist, return undefined
    return undefined;
  }







constructor(private http: HttpClient) { }
apiUrl = this.url+'/api/Signup'; 
  checkEmailExists(userData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/checkEmailExists`, userData);
  }


  checkNameExists(userData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/checkNameExists`, userData);
  }



  registerUser(userData: any): Observable<any> {
    
    return this.http.post<any>(`${this.apiUrl}`, userData);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

generateVerificationCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }
    return code;
}






sendVerificationEmail(email: string, verificationCode: string):void{
emailjs.init("gV5dueFjZf9GsfB1b")
    emailjs.send("service_zvq24uc","template_bciuln6",{
   store: "zara store",
   to_name: "you",
   from_name: " zara store",
   from_email: "nadinenabilkhalil192@gmail.com",
   subject: "gh",
   message: `Your verification code is: ${verificationCode}`,
   reply_to: "gh",
   email:email,
   // Navigate to the verification page

   });}




}
