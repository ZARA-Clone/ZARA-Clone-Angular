import { Component, OnInit } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInfoService } from '../../Services/user-info.service';
import Swal from 'sweetalert2';
import { IuserInfo } from '../../Models/iuser-info';
import { Router, RouterModule } from '@angular/router';
import { RefreshHeaderService } from '../../Services/refresh-header.service';


@Component({
  selector: 'app-edit-user-info',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css'
})
export class EditUserInfoComponent implements OnInit{
  user:IuserInfo={useremail:'',username:'',password:'',newpassword:'',newemail:'',phoneNum:''}
 
  
  
  constructor(private userinfoservice:UserInfoService , private router: Router,private refresh:RefreshHeaderService){


  }
 ngOnInit(): void {

     this.userinfoservice.getuserinfo().subscribe(userInfo => {
      console.log('User Info:', userInfo);
      if (userInfo) {
        this.email = userInfo.email;
        this.phone = userInfo.phoneNumber;
        this.username = userInfo.userName;
      }
    });

  }
  
  email!: string 
  phone!: string 
  username!:string



  onpassSubmit(form:any) {
    this.userinfoservice.changePass(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: 'password changed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.ngOnInit()
    }))
    console.log(form.value);
    const isformvalid=form.form.valid;
    
  }
  onemailSubmit(form:any){
    this.userinfoservice.changeEmail(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: 'Email changed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.ngOnInit()
    }))
    console.log(form.value);
    
  }
  onphoneNumSubmit(form:any){

    this.userinfoservice.changePhoneNumber(form.value).subscribe((p=>{
      Swal.fire({
        title: 'Hello',
        text: 'phone changed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.ngOnInit()
    }))
    
  }
  onSignOut(): void {
    this.userinfoservice.signOut()
    this.refresh.triggerRefresh();
  this.router.navigate(['/signin']);
  }
}
