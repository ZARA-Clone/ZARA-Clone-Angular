import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  constructor(public dialogRef: MatDialogRef<WarningComponent>){}
  closeDialog(){
    this.dialogRef.close();
  }
}
