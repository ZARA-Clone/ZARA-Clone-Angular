import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iemail } from '../Models/iemail';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private http:HttpClient) { }
private url='http://localhost:5098/api/ContactUs'

  sendEmailcontactus(emailData: Iemail): Observable<any> {
    return this.http.post(this.url,emailData);
  }



}

         
