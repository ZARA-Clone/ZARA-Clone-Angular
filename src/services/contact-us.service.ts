import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iemail } from '../Models/iemail';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  url:string=environment.BASEURL
  constructor(private http:HttpClient) { }
private urll=this.url+'/api/ContactUs'


  sendEmailcontactus(emailData: Iemail): Observable<any> {
    return this.http.post(this.urll,emailData);
  }



}

         
