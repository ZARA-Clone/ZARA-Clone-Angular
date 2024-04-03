import { CartComponent } from './../Components/cart.component';
import { Routes } from '@angular/router';
import { RegistrationFormComponent } from '../Components/registration/registration.component';
import { VerificationComponent } from '../Components/verification/verification.component';
import { ConntactUsComponent } from '../Components/conntact-us/conntact-us.component';
export const routes: Routes = [
    {path:"",redirectTo:"Registration",pathMatch:"full"},
      { path: 'registration', component:RegistrationFormComponent},
      { path: 'verification', component:VerificationComponent },
      {path:'Cart',component:CartComponent},
      { path: 'contactus', component: ConntactUsComponent }
      
    ];
