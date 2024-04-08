import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodingService {

  constructor() { }

  getRoleFromToken(token: string | null) {
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log("Payload:", payload);
        const roles = payload ? payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] : null;
        console.log("roles:", roles);
        return roles;
      }
    }
    return "null";
  }

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
