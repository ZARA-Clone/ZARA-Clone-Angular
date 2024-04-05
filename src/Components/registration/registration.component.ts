import { DecodingService } from './../../Services/decoding.service';
import { Component, NgModule } from '@angular/core';
import { FormControl, FormControlName, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';
// import { EmailJSResponseStatus } from '@emailjs/browser';
// import emailjs from '@emailjs/browser';

import { BrowserModule } from '@angular/platform-browser';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Iuserdata } from '../../Models/iuserdata';
import { UserService } from '../../Services/user-service.service';


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationFormComponent  {
  constructor(private route:Router, private uerservice:UserService,private snackbar:MatSnackBar  ){
    
// Call the function to get the user ID





    
  }
  SelectedCountryCode:string|undefined=""
  SelectedCountry:string=""
  phone!: number;
  Name: string='';
  Password: string='';
  Email!: string;
   passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
   namePattern = '[A-Za-z]{1,32}';
   zipcode:string|undefined
    countryControl = new FormControl('', Validators.required);
    Address:string=""
    

Countries=[

  {Country:"Egypt" ,Code:'+20'},
  {Country:"England",Code:'+44'},{
    Country:"Denmark",Code:'+45'},{
      Country:"Canada",Code:'+1'
  }
];








onCountryChange(){

let SelectedCountryobj=this.Countries.find(a=>a.Country===this.SelectedCountry);
console.log("Selected country:", this.SelectedCountry);
this.SelectedCountryCode=SelectedCountryobj?.Code;
//console.log(this.SelectedCountryCode);


}




 async onSubmit(signupform:any) {
console.log(signupform )
  const verificationCode = this.uerservice.generateVerificationCode();

   this.uerservice.setVerificationCode(this.Email,verificationCode);




   const phoneNumber = `${this.SelectedCountryCode}${this.phone}`;
    
  // Store user data
  const userData: Iuserdata = {
    userName: this.Name,
    password: this.Password,
    email: this.Email,
    Address:this.Address,
   
   
    phoneNumber: phoneNumber,
    country: this.SelectedCountry,
    //zipcode:this.SelectedCountryCode

  };


  
  this.uerservice.setuserdata(userData);
  console.log(userData);
 
    
      // If email is unique, register the user
      this.uerservice.checkEmailExists(userData).subscribe((isUnique: boolean) => {
        if (!isUnique) {
            // If email is unique, register the user
            this.uerservice.sendVerificationEmail(this.Email, verificationCode); // Assuming this is the correct method call
            this.route.navigate(['/verification']); // Use 'router' instead of 'route'
        } else {
            this.snackbar.open("This email or the username already exists", 'close', { duration: 3000 });
        }
    });
}// end of onsubmit





getTelephonePattern(): string {
  // Define pattern for telephone numbers starting with "1" and having exactly 10 digits for Egypt
  const egyptPattern = '^[1][0-9]{9}$';

  // Define pattern for telephone numbers starting with "1" and having exactly 10 digits for England
  const englandPattern = '^[1][0-9]{9}$';

  // Define pattern for telephone numbers starting with "1" and having exactly 10 digits for Denmark
  const denmarkPattern = '^[1][0-9]{9}$';

  // Define pattern for telephone numbers starting with "1" and having exactly 10 digits for Canada
  const canadaPattern = '^[1][0-9]{9}$';

  // Return the pattern based on the selected country
  if (this.SelectedCountry === 'Egypt') {
    return egyptPattern;
  } else if (this.SelectedCountry === 'England') {
    return englandPattern;
  } else if (this.SelectedCountry === 'Denmark') {
    return denmarkPattern;
  } else if (this.SelectedCountry === 'Canada') {
    return canadaPattern;
  } else {
    return ''; // Return an empty string if no pattern is specified
  }
}

isCountrySelected(): boolean {
  return !!this.SelectedCountry;
}































}// end of export class
