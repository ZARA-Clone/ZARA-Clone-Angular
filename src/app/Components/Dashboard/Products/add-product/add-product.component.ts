import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AddProductDto } from '../../../../Dtos/Dashboard/add-product-dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOption } from '@angular/material/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ToastrModule, ReactiveFormsModule, MatOption, MatFormFieldModule, NgIf, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: AddProductDto = new AddProductDto();
  ImageUrls: string[] = [];
  selectedBrand: number = 0;
  selectedImages: File[] = [];
  constructor(private _productsService: ProductOperationsService, private router: Router) { }

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
        this.ImageUrls = responses;
        this.product.Name = this.product.Name.trim();
        this.product.Price = this.product.Price;
        this.product.Description = this.product.Description;
        this.product.ImageUrls = this.ImageUrls;
        this.product.Discount = this.product.Discount;
        this.product.Quantity = this.product.Quantity;
        this.product.BrandID = this.selectedBrand;
        this._productsService.add(this.product).subscribe(
          {
            next: (data) => { console.log("data: " + data); this.router.navigate(["dashboard"]) },
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
}