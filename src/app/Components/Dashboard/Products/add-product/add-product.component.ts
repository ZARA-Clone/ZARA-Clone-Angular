import { Component, OnInit } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddProductDto } from '../../../../Dtos/Dashboard/add-product-dto';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup
  private product: AddProductDto = new AddProductDto();
  constructor(private _formBuilder: FormBuilder, private _productsService: ProductOperationsService) { }

  ngOnInit(): void {
    this.productForm = this._formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(50), Validators.max(2000)]],
      quantity: [1, [Validators.required]],
      discount: 0,
      categoryID: [0, [Validators.required]],
      description: ["", Validators.maxLength(500)],
      imgURL: ["", [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.productForm.value)
    this._productsService.add(this.productForm.value).subscribe(({
      next: () => {
        alert('Product has been added successfully')
      },
      error: (err) => {
        alert(err);
      }
    }));
  }
}
