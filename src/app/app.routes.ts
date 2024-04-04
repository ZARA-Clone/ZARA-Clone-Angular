import { Routes } from '@angular/router';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';

export const routes: Routes = [
    { path: 'product/:id', component: ProductDetailsComponent, title: 'Product' },
];
