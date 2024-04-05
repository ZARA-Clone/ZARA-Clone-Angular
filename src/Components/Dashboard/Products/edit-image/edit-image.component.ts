import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';

@Component({
  selector: 'app-edit-image',
  standalone: true,
  imports: [],
  templateUrl: './edit-image.component.html',
  styleUrl: './edit-image.component.css'
})
export class EditImageComponent {
  constructor(
    public _productService: ProductOperationsService,
    public _dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) { }


  removeNewImage(imageUrl: string): void {
    this._data.newUrls = this._data.newUrls.filter((url: string) => url !== imageUrl);
    console.log('Updated new urls:', this._data.newUrls);
  }

  removeOldImage(imageUrl: any): void {
    this._data.imageUrls = this._data.imageUrls.filter((url: string) => url !== imageUrl);
    console.log('Updated old Urls:', this._data.imageUrls);
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    let newImages = Array.prototype.slice.call(input.files) as File[];
    console.log("newImages", newImages)
    this._productService.upload(newImages).subscribe((responses: any) => {
      console.log("responses", responses);
      this._data.newUrls = responses;
    })
  }

  saveChanges(): void {
    this._dialogRef.close({ newUrls: this._data.newUrls, imageUrls: this._data.imageUrls });
  }
}
