import { Routes } from '@angular/router';
import { ConfirmemailComponent } from '../Components/confirmemail/confirmemail.component';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';

export const routes: Routes = [
    {   path:'confirmfemail',component:ConfirmemailComponent },
    {path:'aboutus',component:AboutussComponent}
];
