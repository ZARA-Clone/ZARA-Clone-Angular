import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { IBrandDto } from '../../../../Models/Dashboard/Brands/IBrandDto.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent implements OnInit {
  brand!: IBrandDto;
  brandForm!: FormGroup
  errorMessages: any[] = []
  errorMessage!: string | null

  constructor(private _router: Router,
    private _brandsService: BrandsService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.brandForm = this._formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoryId: [0, [Validators.required, this.validateSelectedOption]],
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
    console.log(this.brandForm.value);
    this._brandsService.add(this.brandForm.value).subscribe({
      next: () => {
        this._snackBar.open("Brand has been added successfully", "Okay")
        this._router.navigate(['/dashboard/brands'])
      },
      error: (e) => {
        console.log(e);
        for (let index = 0; index < e.error.messages.length; index++) {
          const element = e.error.messages[index];
          this.errorMessages.push(element)
        }
        this._snackBar.open('Error occurred when add data', 'Ok')
      }
    })
  }
}