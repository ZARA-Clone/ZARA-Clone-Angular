import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgetpass',
  standalone: true,
   imports: [CommonModule,ReactiveFormsModule ],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',
    [Validators.required,
      Validators.email] ),
    });
}
