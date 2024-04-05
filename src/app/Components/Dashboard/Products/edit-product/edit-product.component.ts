import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEditProductDto } from '../../../../Dtos/Dashboard/Products/IEditProductDto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditImageComponent } from '../edit-image/edit-image.component';
import { NgFor } from '@angular/common';
import { Size } from '../../../../Dtos/Dashboard/Products/IAddProductDto.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgFor],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})

export class EditProductComponent implements OnInit {
  private _brands: any = [];
  productForm!: FormGroup;
  product!: IEditProductDto
  newProduct!: IEditProductDto
  brands: any[] = [];
  selectedBrand = 0;
  imageUrls: string[] = [];
  newUrls: string[] = [];
  selectedSizes: any[] = []
  selectedSize: string = ''
  sizeArray: { key: string, value: number }[];

  constructor(private _productsService: ProductOperationsService
    , private _brandsService: BrandsService
    , private _router: Router
    , private _snackBar: MatSnackBar
    , private _activatedRoute: ActivatedRoute
    , private _formBuilder: FormBuilder
    , private _dialog: MatDialog
  ) {
    this.sizeArray = Object.entries(Size)
      .filter(([key, value]) => !isNaN(Number(Size[value as number])))
      .map(([key, value]) => ({ key, value: value as number }));
  }

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", Validators.maxLength(500)],
      price: [0, [Validators.required]],
      discount: [0, [Validators.required]],
      brandId: [this.selectedBrand, [Validators.required]],
      imageUrls: [[]],
      sizes: this._formBuilder.array([], Validators.required)
    })

    this._activatedRoute.paramMap.subscribe((param) => {
      let idAsString = param.get('id');
      let id = Number(idAsString);
      this._productsService.getById(id)
        .subscribe((product) => {
          this.getProduct(product.id)
        })
    })
    this.getAllBrands();
    this.sizes;
    this.showSizes()
  }

  get sizes() {
    return this.productForm.get('sizes') as FormArray;
  }

  showSizes() {
    for (let index = 0; index < this.product.sizes.length; index++) {
      let s = this.product.sizes[index].key;
      let q = this.product.sizes[index].value;
      this.sizes.push(this._formBuilder.group({
        size: [s, Validators.required],
        quantity: [q, [Validators.required, Validators.min(1)]]
      }));
    }
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

  getProduct(id: number) {
    this._productsService.getById(id).subscribe((product) => {
      this.product = product
      console.log(product)
      let selectedBrand = this.brands.find((b) => b.id == this.product.brandId)
      if (selectedBrand) {
        this.selectedBrand = selectedBrand.id
      }
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        discount: product.discount,
        price: product.price,
        brandID: product.brandId,
        imageUrls: product.imageUrls,
        sizes: product.sizes
          .map((size: any) => ({
            key: size.size,
            value: size.quantity
          })),
      })
      this.showSizes()
    })
  }

  onSubmit() {
    this.newProduct = {
      id: this.product.id,
      name: this.productForm.value.name.trim(),
      description: this.productForm.value.description.trim(),
      price: this.productForm.value.price,
      discount: this.productForm.value.discount,
      imageUrls: this.newUrls.concat(this.product.imageUrls),
      brandId: this.selectedBrand,
      sizes: this.productForm.value.sizes
        .map((size: any) => ({
          key: size.size,
          value: size.quantity
        })),
    }
    console.log(this.newProduct)
    this._productsService.edit(this.product.id, this.newProduct).subscribe({
      next: () => {
        this._snackBar.open('Data has been updated Successfully', 'Okay')
        this._router.navigate(['/dashboard/products'])
      },
      error: () => {
        this._snackBar.open('Error occurred when update data', 'Okay')
      }
    })

  }

  viewImages() {
    const dialogRef = this._dialog.open(EditImageComponent,
      {
        data: { newUrls: this.newUrls, imageUrls: this.product.imageUrls },
        maxHeight: '70vh', height: '70%', width: '50%'
      });

    dialogRef.afterClosed().subscribe((result: { newUrls: string[], imageUrls: string[] }) => {
      if (result) {
        this.newUrls = result.newUrls;
        this.product.imageUrls = result.imageUrls;
      }
    });
  }
}
