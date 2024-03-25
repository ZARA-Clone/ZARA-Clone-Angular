import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductDto } from '../../../../Dtos/Dashboard/add-product-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
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
export class AddProductComponent implements OnInit {
  product: AddProductDto = new AddProductDto();
  productForm!: FormGroup
  ImageUrls: string[] = [];
  selectedBrand: number = 0;
  selectedImage: File | null = null;
  constructor(private _http: HttpClient
    , private _formBuilder: FormBuilder, private _productsService: ProductOperationsService
    , private router: Router) { }

  ngOnInit(): void {
    // this.productForm = this._formBuilder.group({
    //   name: ["", [Validators.required, Validators.minLength(3)]],
    //   price: [null, [Validators.required, Validators.min(50), Validators.max(2000)]],
    //   quantity: [1, [Validators.required]],
    //   discount: 0,
    //   categoryID: [0, [Validators.required]],
    //   description: ["", Validators.maxLength(500)],
    //   ImageUrls: []
  }
  // onSubmit(productForm: NgForm) {
  //   // console.log(this.productForm.value)
  //   // this._productsService.add(this.productForm.value).subscribe(({
  //   //   next: () => {
  //   //     alert('Product has been added successfully')
  //   //   },
  //   //   error: (err) => {
  //   //     alert(err);
  //   //   }
  //   // }));
  //   if (productForm.invalid)
  //     return;
  //   this._productsService
  //     .upload2(this.selectedImages)
  //     .subscribe({
  //       next: (responses: any) => {
  //         console.log(responses);
  //         this.ImageUrls = responses;
  //         this.product.Name = this.product.Name.trim(),
  //           this.product.Price = +this.product.Price;
  //         this.product.Description = this.product.Description;
  //         this.product.ImageUrls = this.ImageUrls;
  //         this.product.Discount = this.product.Discount;
  //         this.product.BrandID = this.selectedBrand;
  //         this._productsService.add(this.product).subscribe(
  //           {
  //             next: (data) => { console.log(data); this.router.navigate(["dashboard/products"]) },
  //             error: (err) => { console.log(err) },
  //             complete: () => {
  //               console.log("product adding success")
  //             }
  //           })
  //         this.toastr.success("product adding success");
  //       },
  //       error: (err: any) => { console.log("error uploading photos:", err); }
  //     })
  // }
  // uploadImage(event: any) {
  //   this.productForm.value.Imageurls = event.target.files;
  //   console.log(this.productForm.value.ImageUrls)
  // }

  // uploadPhotos(e: Event) {
  //   const input = e.target as HTMLInputElement;
  //   this.selectedImages = Array.prototype.slice.call(input.files) as File[];
  //   console.log(this.selectedImages);
  // }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
  onSubmit() {
    this._productsService.upload3(this.selectedImage);
  }
}