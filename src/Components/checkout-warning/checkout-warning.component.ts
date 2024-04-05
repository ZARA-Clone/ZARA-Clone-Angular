import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-checkout-warning',
  standalone: true,
  imports: [],
  templateUrl: './checkout-warning.component.html',
  styleUrl: './checkout-warning.component.css'
})
export class CheckoutWarningComponent {

  constructor(public dialogRef: MatDialogRef<CheckoutWarningComponent>){}
    closeDialog(){
    this.dialogRef.close();
  }
}
