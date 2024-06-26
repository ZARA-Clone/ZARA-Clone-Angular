import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  Routes = [
    { path: '/dashboard/brands', title: 'Brands', icon: 'fas fa-th-large' },
    { path: '/dashboard/products', title: 'Products', icon: 'fas fa-tshirt' },
    { path: '/dashboard/users', title: 'Users', icon: 'fas fa-users' },
    { path: '/dashboard/orders', title: 'Orders', icon: 'fas fa-shopping-cart' },
  ]
}
