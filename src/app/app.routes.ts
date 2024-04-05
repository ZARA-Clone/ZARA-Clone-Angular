import { CartComponent } from './../Components/cart.component';
import { Routes } from '@angular/router';
import { WishlistComponent } from '../Components/wishlist/wishlist.component';
import { ConfirmemailComponent } from '../Components/confirmemail/confirmemail.component';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';
import { HomeComponent } from '../Components/home/home.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { CardDetailsComponent } from '../Components/card-details/card-details.component';
import { ChoosePaymentMethodComponent } from '../Components/choose-payment-method/choose-payment-method.component';
import { PODCOFIRMComponent } from '../Components/pod-cofirm/pod-cofirm.component';
import { RegistrationFormComponent } from '../Components/registration/registration.component';
import { VerificationComponent } from '../Components/verification/verification.component';
import { ConntactUsComponent } from '../Components/conntact-us/conntact-us.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home' , component:HomeComponent},
    {path:'confirmfemail',component:ConfirmemailComponent },
    {path:'aboutus',component:AboutussComponent},
    {path:'wishlist',component:WishlistComponent},
    { path: 'product/:id', component: ProductDetailsComponent, title: 'Product' },
    {path:'choosepayment' , component:ChoosePaymentMethodComponent},
    {path:'carddetails' , component:CardDetailsComponent},
    {path:'podconfirm' , component:PODCOFIRMComponent},
      { path: 'registration', component:RegistrationFormComponent},
      { path: 'verification', component:VerificationComponent },
      {path:'Cart',component:CartComponent},
      { path: 'contactus', component: ConntactUsComponent }
    ];
