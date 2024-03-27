import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/Dashboard/Products/add-product/add-product.component';
import { EditProductComponent } from './Components/Dashboard/Products/edit-product/edit-product.component';

export const routes: Routes = [
    { path: 'add', component: AddProductComponent, title: 'Add Product' },
    { path: 'edit/:id', component: EditProductComponent, title: 'Edit Product' }
];
