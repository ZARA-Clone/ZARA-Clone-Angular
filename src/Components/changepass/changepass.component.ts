import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [CommonModule,FormsModule,DialogModule],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.css'
})
export class ChangepassComponent {
  password!: string;
  confirmPassword!: string;
   resetForm: any;

  constructor(private http: HttpClient ,private router:Router) {}

  resetPassword(): void {
    let email = localStorage.getItem('resetEmail');
    let token = localStorage.getItem('token');

    if (!email || !token) {
      console.error('Email or token not found in session storage.');
      return;
    }

    const requestBody = {
      password: this.password,
      confirmPassword: this.confirmPassword,
      email: email,
      token: token
    };

    this.http.post('https://localhost:7248/api/Authentication/ResetPassword', requestBody)
    .subscribe(
      
     Response=>console.log("perobsjwb") 

      );
  }


showConfirmDialog: boolean = false;
showErrorDialog: boolean = false;
showPassErrorDialog: boolean = false;
isConfirmPassMatch() {
  return this.password === this.confirmPassword;
}
// Validate password with regular expression
validatePassword() {
  let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordPattern.test(this.password)
}

ShowDialog() {
  if (!this.validatePassword()) {
    this.showPassErrorDialog = true;
  } 
  else if (!this.isConfirmPassMatch()) {
    this.showErrorDialog = true;
  }
  else {
    this.showConfirmDialog = true;
    this.resetPassword();    
   
  }
  
}

  CloseAllDialogs() {

    this.showConfirmDialog = false;
    this.showErrorDialog = false;
    this.showPassErrorDialog = false;
  }
}
