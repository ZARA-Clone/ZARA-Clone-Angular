import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {MatSnackBar }from '@angular/material/snack-bar'
import { UserService } from '../../Services/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
   validationcode:string='';
   enteredcode:string='';
   userData: any = {};
  constructor(private ema:UserService,private snackbar:MatSnackBar,private route:Router){}


  ngOnInit(): void {
    
   this.userData = this.ema.getuserdata();

    if (this.userData && this.userData.email) {
      const verificationCode = this.ema.getVerificationCode(this.userData.email);
      if (verificationCode !== undefined) {
        this.validationcode = verificationCode;
        console.log(this.validationcode);
      } else {
        console.error('Verification code is undefined.');
      }
    } else {
      console.error('No user data found or email is missing.');
    }
  }

  
   
    
 
    
      
      
    

      //iwant to handle 


        verifyCode(): void {
        
          if (this.validationcode.trim() === this.enteredcode.trim()) {
            // Code matches
            console.log('Verification successful');
            console.log(this.ema.getuserdata());
          
            this.ema.registerUser(this.userData).subscribe(

              (response) => {
              console.log(response)
              
                if (response && response.token) {
                 
                  this.ema.saveToken(response.token);
                
                  this.snackbar.open("Your Account Has Been Saved", 'close', { duration: 3000 });}}
                 
                
         ,(error)=>{
          console.error("Registration failed", error);
          this.snackbar.open("Failed to register your account", 'close', { duration: 3000 });
         }

              )
              
             
          } else {
            // Code does not match, 
            this.snackbar.open(" You Entered a Wrong Code",'close',{duration:3000});
            
          }


        }



        resendcodee(): void {
          const userData = this.ema.getuserdata();
          if (userData && userData.email) {
            // Generate and send the new verification code
            const verificationCode = this.ema.generateVerificationCode();
            this.ema.setVerificationCode(userData.email, verificationCode);
            this.ema.sendVerificationEmail(userData.email, verificationCode);
            console.log('New Verification Code:', verificationCode);
            this.validationcode = verificationCode;
          } else {
            console.error('No user data found or email is missing.');
          }
        }

        
    }