import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/Dashboard/Products/add-product/add-product.component';

export const routes: Routes = [
    { path: 'dashboard', component: AddProductComponent, title: 'Add Product' }
];
