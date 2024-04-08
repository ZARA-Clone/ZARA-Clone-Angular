import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactUsService } from './../../Services/contact-us.service';
import { Component } from '@angular/core';
import { Iemail } from '../../Models/iemail';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-conntact-us',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './conntact-us.component.html',
  styleUrl: './conntact-us.component.css'
})
export class ConntactUsComponent {

constructor(private ContactUsService:ContactUsService,private MatSnackBar:MatSnackBar){}

  Name: string='';
  Email!: string;
  Message!:string;
  Subject!:string;

  namePattern = '[A-Za-z]{1,32}';
  subjectPattern = '[\\w\\s.,-_]{2,50}';
  messagePattern = '[\\w\\s.,!?\'"()\\-]{5,500}';


  async onSubmit(signupform:any) {
  
     
  
    
    

        
      // Store user data
      const EmailData:Iemail  = {
        //username: this.Name,
       toEmail:this.Email,
       body:this.Message,
       subject:this.Subject

    
      };
      this.ContactUsService.sendEmailcontactus(EmailData).subscribe(
      () => {
        
        this.MatSnackBar.open("Your message send successfully",'close',{duration:3000})
       
      },
      (error) => {
        console.error('Error sending email:', error);
        
      }
    );
      
}



showErrorMessages(username: NgModel): boolean {
  return !!username && !!username.invalid && !!username.dirty && !!username.touched;
}

showPatternErrorMessage(username: NgModel): boolean {
  return !!username && !!username.errors && !!username.errors['pattern'];
}

showRequiredErrorMessage(username: NgModel): boolean {
  return !!username && !!username.errors && !!username.errors['required'];
}






}
