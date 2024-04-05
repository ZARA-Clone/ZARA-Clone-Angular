import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodingService {

  constructor() { }









 extractUserIdFromToken() {
  const token = localStorage.getItem('token');
  console.log("Token:", token); 
  if (token) {
      const tokenParts = token.split('.');
      console.log("Token Parts:", tokenParts); 
      if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("Payload:", payload); 
          const userId = payload ? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;
          return userId;
      }
  }
  return null;
}

}
