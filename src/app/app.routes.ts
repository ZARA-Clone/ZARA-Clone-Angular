import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/Dashboard/Products/add-product/add-product.component';
import { EditProductComponent } from './Components/Dashboard/Products/edit-product/edit-product.component';
import { ProductListComponent } from './Components/Dashboard/Products/product-list/product-list.component';
import { AddBrandComponent } from './Components/Dashboard/Brands/add-brand/add-brand.component';
import { BrandListComponent } from './Components/Dashboard/Brands/brand-list/brand-list.component';
import { EditBrandComponent } from './Components/Dashboard/Brands/edit-brand/edit-brand.component';
import { DataComponent } from './Components/Dashboard/data/data.component';
import { MainDashbordComponent } from './Components/Dashboard/main/main.component';

export const routes: Routes = [
    {
        path: "dashboard", component: MainDashbordComponent, children: [
            { path: 'products', component: ProductListComponent, title: 'Products' },
            { path: 'addProduct', component: AddProductComponent, title: 'Add Product' },
            { path: 'products/edit/:id', component: EditProductComponent, title: 'Edit Product' },
            { path: 'brands', component: BrandListComponent, title: 'Brands' },
            { path: 'addbrand', component: AddBrandComponent, title: 'Add Brand' },
            { path: 'brands/edit/:id', component: EditBrandComponent, title: 'Edit Brand' },
            { path: 'data', component: DataComponent, title: 'Data' },
        ]
    },
]
