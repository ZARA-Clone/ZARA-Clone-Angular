import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { AddProductDto, ProductSize, Size } from '../../../../Models/Dashboard/Products/IAddProductDto.interface';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor, CommonModule],
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
  errorMessages: any[] = []

  constructor(
    private _productsService: ProductOperationsService,
    private router: Router,
    private _brandsService: BrandsService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.sizeArray = Object.entries(Size)
      .filter(([key, value]) => !isNaN(Number(Size[value as number])))
      .map(([key, value]) => ({ key, value: value as number }));
  }

  ngOnInit(): void {
    this.getAllBrands()
    this.productForm = this._formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ["", Validators.maxLength(500)],
      price: [0, [Validators.required, Validators.min(100), Validators.max(10000)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(80)]],
      brandId: [0, [this.validateSelectedOption]],
      imageUrls: [[]],
      sizes: this._formBuilder.array([])
    })
    this.sizes;
    this.showSizes()
  }

  validateSelectedOption(control: AbstractControl) {
    const selectedValue = control.value;
    return selectedValue > 0 ? null : { invalidOption: true };
  }

  get name() {
    return this.productForm.get('name')
  }
  get description() {
    return this.productForm.get('description')
  }
  get price() {
    return this.productForm.get('price')
  }
  get brandId() {
    return this.productForm.get('brandId')
  }
  get discount() {
    return this.productForm.get('discount')
  }

  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  showSizes() {
    for (let index = 0; index < this.sizeArray.length; index++) {
      let s = this.sizeArray[index].key;
      let q = this.sizeArray[index].value;
      console.log(s)
      this.sizes.push(this._formBuilder.group({
        size: [q, Validators.required],
        quantity: [0, [Validators.required]]
      }));
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    this.selectedImages = Array.prototype.slice.call(input.files) as File[];
  }

  onSubmit() {
    console.log(this.sizes.value)
    if (this.productForm.invalid) {
      console.log("product form is invalid")
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
          next: (data) => {
            this._snackBar.open("Product has been added successfully", 'Ok')
            console.log(data); this.router.navigate(["/dashboard/products"])
          },
          error: (e) => {
            console.log(e);
            for (let index = 0; index < e.error.messages.length; index++) {
              const element = e.error.messages[index];
              this.errorMessages.push(element)
            }
            this._snackBar.open('Error occurred when add data', 'Ok')
          },
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