import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEditProductDto } from '../../../../Dtos/Dashboard/Products/IEditProductDto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditImageComponent } from '../edit-image/edit-image.component';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
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
  constructor(private _productsService: ProductOperationsService
    , private _brandsService: BrandsService
    , private _router: Router
    , private _snackBar: MatSnackBar
    , private _activatedRoute: ActivatedRoute
    , private _formBuilder: FormBuilder
    , private _dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", Validators.maxLength(500)],
      price: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      discount: [0, [Validators.required]],
      brandId: [this.selectedBrand, [Validators.required]],
      imageUrls: [[]],
    })
    this.getAllBrands();

    this._activatedRoute.paramMap.subscribe((param) => {
      let idAsString = param.get('id');
      let id = Number(idAsString);
      this._productsService.getById(id)
        .subscribe((product) => {
          this.getProduct(product.id)
        })
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

  getProduct(id: number) {
    this._productsService.getById(id).subscribe((product) => {
      this.product = product
      let selectedBrand = this.brands.find((b) => b.id == this.product.brandId)
      if (selectedBrand) {
        this.selectedBrand = selectedBrand.id
      }
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        description: product.description,
        discount: product.discount,
        price: product.price,
        quantity: product.quantity,
        brandID: product.brandId,
        imageUrls: product.imageUrls,
      })
    })
  }

  onSubmit() {
    this.newProduct = {
      id: this.product.id,
      name: this.product.name.trim(),
      description: this.product.description.trim(),
      price: this.product.price,
      discount: this.product.discount,
      quantity: this.product.quantity,
      imageUrls: this.newUrls.concat(this.product.imageUrls),
      brandId: this.selectedBrand,
    }

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
