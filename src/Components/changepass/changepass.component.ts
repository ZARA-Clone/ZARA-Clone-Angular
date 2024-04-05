import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  standalone: true,
  imports: [],
  templateUrl: './changepass.component.html',
  styleUrl: './changepass.component.css'
})
export class ChangepassComponent {
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',
    [Validators.required,
      Validators.email] ),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)
    ])
    });
//     @ViewChild('exampleModalCenter') modal: any;

//   // openModal() {
//   //   // Show the modal
//   //   this.modal.show();
//   // }
//   // saveChanges(){
//   //   this.modal.hide();
//   // }
}
