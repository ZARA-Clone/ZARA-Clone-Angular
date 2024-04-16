import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBrandEditDto } from '../../../../Models/Dashboard/Brands/Ibrand-edit-dto';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-brand',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-brand.component.html',
  styleUrl: './edit-brand.component.css'
})
export class EditBrandComponent {
  brand!: IBrandEditDto;
  newBrand!: IBrandEditDto
  brandForm!: FormGroup
  selectedCategory!: number
  categories: any[] = [
    { id: 1, name: "Man" },
    { id: 2, name: "Woman" },
    { id: 3, name: "Kids" }
  ]
  errorMessages: any[] = []

  constructor(private _router: Router,
    private _brandsService: BrandsService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.brandForm = this._formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoryId: [, [Validators.required, this.validateSelectedOption]],
    })
    this._activatedRoute.paramMap.subscribe((param) => {
      let idAsString = param.get('id');
      let id = Number(idAsString);
      this._brandsService.getById(id)
        .subscribe((brand) => {
          this.getBrand(brand.id)
        })
    })
  }

  validateSelectedOption(control: AbstractControl) {
    const selectedValue = control.value;
    return selectedValue > 0 ? null : { invalidOption: true };
  }
  get name() {
    return this.brandForm.get('name')
  }
  get categoryId() {
    return this.brandForm.get('categoryId')
  }

  onSubmit() {
    this.newBrand = { id: this.brand.id, ...this.brandForm.value }
    this._brandsService.edit(this.brand.id, this.newBrand).subscribe({
      next: () => {
        this._snackBar.open("Brand has been updated successfully", "Okay")
        this._router.navigate(['/dashboard/brands'])
      },
      error: (e) => {
        console.log(e);
        for (let index = 0; index < e.error.messages.length; index++) {
          const element = e.error.messages[index];
          this.errorMessages.push(element)
        }
        this._snackBar.open('Error occurred when update data', 'Ok')
      },
    })
  }

  getBrand(id: number) {
    this._brandsService.getById(id).subscribe((brand) => {
      this.brand = brand
      let category = this.categories.find((c) => c.id == this.brand.categoryId)
      if (category) {
        this.selectedCategory = category.id
      }
      this.brandForm.patchValue({
        name: brand.name,
        categoryId: brand.categoryId,
      })
    })
  }
}
