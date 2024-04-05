import { Routes } from '@angular/router';
import { WishlistComponent } from '../Components/wishlist/wishlist.component';
import { ConfirmemailComponent } from '../Components/confirmemail/confirmemail.component';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';
import { HomeComponent } from '../Components/home/home.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path:'home' , component:HomeComponent},
    {path:'confirmfemail',component:ConfirmemailComponent },
    {path:'aboutus',component:AboutussComponent},
    {path:'wishlist',component:WishlistComponent}
];
