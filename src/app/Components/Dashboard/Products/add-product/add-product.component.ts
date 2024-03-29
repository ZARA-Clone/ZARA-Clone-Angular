import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AddProductDto } from '../../../../Dtos/Dashboard/Products/IAddProductDto.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOption } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ToastrModule, ReactiveFormsModule, MatOption, MatFormFieldModule, NgIf, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  product: AddProductDto = new AddProductDto();
  imageUrls: string[] = [];
  selectedBrand: number = 0;
  selectedImages: File[] = [];
  brands: any[] = []
  private _brands: any = [];
  constructor(
    private _productsService: ProductOperationsService,
    private router: Router,
    private _brandsService: BrandsService
  ) { }
  ngOnInit(): void {
    this.getAllBrands()
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedImages = Array.prototype.slice.call(input.files) as File[];
  }
  onSubmit(productForm: NgForm) {
    if (productForm.invalid)
      return;
    this._productsService.upload(this.selectedImages).subscribe({
      next: (responses: any) => {
        console.log("res: " + responses);
        this.imageUrls = responses;
        this.product.name = this.product.name.trim();
        this.product.price = this.product.price;
        this.product.description = this.product.description;
        this.product.imageUrls = this.imageUrls;
        this.product.discount = this.product.discount;
        this.product.quantity = this.product.quantity;
        this.product.brandId = this.selectedBrand;
        console.log(this.imageUrls)
        this._productsService.add(this.product).subscribe(
          {
            next: (data) => { console.log("data: " + data); this.router.navigate(["/"]) },
            error: (err) => { console.log("err: " + err) },
            complete: () => {
              console.log("Product has been added successfully")
            }
          })
        alert("Product has been added successfully");
      },
      error: (err: any) => {
        console.log("error uploading photos:", err);
      }
    })
  }
  getAllBrands(): void {
    this._brandsService.getAll().subscribe({
      next: (data) => {
        this._brands = data
        this.brands = this._brands
      },
      error: (error) => { console.log(error) },
      complete: () => { console.log("Get all brands successfully") }
    })
  }
}