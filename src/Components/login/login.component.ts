import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',
    [Validators.required,
      Validators.email] ),
    password: new FormControl('', [
      Validators.required,
     ])
    });


constructor(private _AuthService:AuthService,private _Router:Router){}
  handleForm(): void {
    const userData = this.loginForm.value;
  
  
  

    if (this.loginForm.valid) {
  
      this._AuthService.login(userData).subscribe({
       
        
        next: (response) => {
          console.log(response)
          const token = (localStorage.setItem("token",response.token));
          // if (response.message === 'success') {

          //   // this._Router.navigate(['/home']);
          //   console.log(response);
          
          // }
        },
        // error: (err) => {
        //   console.log(err);
        //   this.errMsg = err.error.message;

        // }
      });
    }
  }


  }

  // Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')