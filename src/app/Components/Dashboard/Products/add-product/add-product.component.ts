import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductDto, Size, ProductSize } from '../../../../Dtos/Dashboard/Products/IAddProductDto.interface';
import { Router } from '@angular/router';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor],
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
  productSizes: ProductSize[] = []
  sizeArray: { key: string, value: number }[];
  productForm!: FormGroup

  constructor(
    private _productsService: ProductOperationsService,
    private router: Router,
    private _brandsService: BrandsService,
    private _formBuilder: FormBuilder
  ) {
    this.sizeArray = Object.entries(Size)
      .filter(([key, value]) => !isNaN(Number(Size[value as number])))
      .map(([key, value]) => ({ key, value: value as number }));
  }

  ngOnInit(): void {
    this.getAllBrands()
    this.productForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", Validators.maxLength(500)],
      price: [0, [Validators.required]],
      discount: [0, [Validators.required]],
      brandId: [0, [Validators.required]],
      imageUrls: [[]],
      sizes: this._formBuilder.array([], Validators.required)
    })
  }
  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  addSize() {
    this.sizes.push(this._formBuilder.group({
      size: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removeSize(index: number) {
    this.sizes.removeAt(index);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedImages = Array.prototype.slice.call(input.files) as File[];
  }

  onSubmit() {
    console.log(this.sizes.value)
    if (this.productForm.invalid) {
      return;
    }
    this._productsService.upload(this.selectedImages).subscribe({
      next: (responses: any) => {
        this.imageUrls = responses;
        const formData = {
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          discount: this.productForm.value.discount,
          price: this.productForm.value.price,
          brandId: this.productForm.value.brandId,
          imageUrls: responses,
          sizes: this.productForm.value.sizes
            .map((size: any) => ({
              key: size.size,
              value: size.quantity
            })),
        };
        this.product = { ...formData }
        this.product.imageUrls = this.imageUrls;
        console.log(this.product)
        this._productsService.add(this.product).subscribe({
          next: (data) => { console.log(data); this.router.navigate(["/dashboard/products"]) },
          error: (err) => { console.log(err) },
          complete: () => {
            console.log("Product has been added successfully")
          }
        })
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