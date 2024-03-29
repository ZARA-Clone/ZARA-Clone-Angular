import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/Dashboard/Products/add-product/add-product.component';
import { EditProductComponent } from './Components/Dashboard/Products/edit-product/edit-product.component';
import { ProductListComponent } from './Components/Dashboard/Products/product-list/product-list.component';
import { AddBrandComponent } from './Components/Dashboard/Brands/add-brand/add-brand.component';
import { BrandListComponent } from './Components/Dashboard/Brands/brand-list/brand-list.component';

export const routes: Routes = [
    {
        path: "dashboard", children: [
            { path: 'products', component: ProductListComponent, title: 'Products' },
            { path: 'addProduct', component: AddProductComponent, title: 'Add Product' },
            { path: 'edit/:id', component: EditProductComponent, title: 'Edit Product' },
            { path: 'brands', component: BrandListComponent, title: 'Brands' },
            { path: 'addbrand', component: AddBrandComponent, title: 'Add Brand' },
        ]
    },
]
