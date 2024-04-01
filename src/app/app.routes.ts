import { Routes } from '@angular/router';
import { CardDetailsComponent } from '../Components/card-details/card-details.component';
import { ChoosePaymentMethodComponent } from '../Components/choose-payment-method/choose-payment-method.component';
import { PODCOFIRMComponent } from '../Components/pod-cofirm/pod-cofirm.component';
export const routes: Routes = [
    { path: '', redirectTo: 'choosepayment', pathMatch: 'full' },
    {path:'choosepayment' , component:ChoosePaymentMethodComponent},
    {path:'carddetails' , component:CardDetailsComponent},
    {path:'podconfirm' , component:PODCOFIRMComponent}
];
