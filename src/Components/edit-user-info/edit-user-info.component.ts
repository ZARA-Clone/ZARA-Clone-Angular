import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../Services/user-info.service';
import Swal from 'sweetalert2';
import { IuserInfo } from '../../Models/iuser-info';

@Component({
  selector: 'app-edit-user-info',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css'
})
export class EditUserInfoComponent {
  user:IuserInfo={useremail:'',username:'',password:'',newpassword:'',newemail:'',phoneNum:''}

  
  
  constructor(private userinfoservice:UserInfoService){

  }


  onpassSubmit(form:any) {
    this.userinfoservice.changePass(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: p,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }))
    console.log(form.value);
    const isformvalid=form.form.valid;
  }
  onemailSubmit(form:any){
    this.userinfoservice.changeemail(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: p,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }))
    console.log(form.value);
  }
  onphoneNumSubmit(form:any){
    this.userinfoservice.changephoneNum(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: p,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }))
  }

}
