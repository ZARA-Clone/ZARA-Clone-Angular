import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/Dashboard/Products/add-product/add-product.component';
import { EditProductComponent } from './Components/Dashboard/Products/edit-product/edit-product.component';
import { ProductListComponent } from './Components/Dashboard/Products/product-list/product-list.component';

export const routes: Routes = [
    { path: 'add', component: AddProductComponent, title: 'Add Product' },
    { path: 'edit/:id', component: EditProductComponent, title: 'Edit Product' },
    { path: 'products', component: ProductListComponent, title: 'Products' }
];
