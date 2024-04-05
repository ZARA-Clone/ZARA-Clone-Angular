import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrandsService } from '../../../../Services/Dashboard/brands.service';
import { IBrandDto } from '../../../../Models/Dashboard/Brands/IBrandDto.interface';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css'
})
export class AddBrandComponent implements OnInit {
  brand!: IBrandDto;
  brandForm!: FormGroup
  constructor(private _router: Router,
    private _brandsService: BrandsService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.brandForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      categoryId: [0, [Validators.required]],
    })
  }

  onSubmit() {
    console.log(this.brandForm.value);
    this._brandsService.add(this.brandForm.value).subscribe({
      next: () => {
        this._snackBar.open("Brand has been added successfully", "Okay")
        this._router.navigate(['/dashboard/brands'])
      }
    })
  }
}