import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
   imports: [CommonModule,ReactiveFormsModule,RouterModule,DialogModule],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})

export class ForgetpassComponent {

  myform:FormGroup 
constructor(private formbuilder:FormBuilder,private http:HttpClient , private router:Router){
  this.myform=formbuilder.group({email:['',[Validators.required,Validators.email]]})
}
onclick() {
  console.log("bgshsg");

  if (this.myform.valid) {
    let email = this.myform.value.email;
    this.http.post<any>(`https://localhost:7248/api/Authentication/ForgetPassword?email=${email}`, { email }).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('resetEmail',response.email);
        this.router.navigate(['/changepass']);
       
      },
      (error) => {
        console.error('Error occurred:', error);
        // Handle error appropriately, for example, show a message to the user
      }
    );
  }
}
showConfirmDialog: boolean = false;
showErrorDialog: boolean = false;

isInvalidEmail()
{
  return this.myform.get('email')?.touched && this.myform.get('email')?.invalid;
}


isValidEmail()
{
  return this.myform.get('email')?.touched && this.myform.get('email')?.invalid;
}

ShowDialog() {
  if (this.myform.valid) {
    this.showConfirmDialog = true;
    this.onclick() 
    
  } else {
    this.showErrorDialog = true;
  }
}

  CloseAllDialogs() {
    this.showConfirmDialog = false;
    this.showErrorDialog = false;
  }
  redirecttochngepass(){
     this.router.navigate(['/changepass']);
  }
}
