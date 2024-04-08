import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  showErrorDialog: boolean = false;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',
    [Validators.required,
      Validators.email] ),
    password: new FormControl('', [
      Validators.required,
     ])
    });


constructor(private _AuthService:AuthService,private router:Router){}
  handleForm(): void {
    const userData = this.loginForm.value;
  
  
  

    if (this.loginForm.valid) {
  
      this._AuthService.login(userData).subscribe({
       
        
        next: (response) => {
          console.log(response)
          const token = (localStorage.setItem("token",response.token));
          this.router.navigate(['/home']);
     
        },
       
        error: (err) => {
         this.showErrorDialog=true;
        
        }
      });
    }
  }

onclick(){

  this.router.navigate(['/registration']);
}

CloseAllDialogs() {

 
  this.showErrorDialog = false;
  
}

  }

  