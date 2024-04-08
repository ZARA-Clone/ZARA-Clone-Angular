import { NgClass, NgStyle } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { HttpHeaderService } from '../../Services/http-header.service';
import { Icategory } from '../../Models/ICategory';
import { SharedValueService } from '../../Services/shared-value.service';
import { UserInfoService } from '../../Services/user-info.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle,NgClass,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  showDropdown: boolean = false;
  showMenu: boolean = false;
  stylingforHOME:boolean=false;
  Categories!: Icategory[] | any
  Brands!:Icategory[] | any
  email!: string 
  phone!: string 
  username!:string
  checklogging:boolean = false;
constructor(private router:Router, private httpheader:HttpHeaderService,private sharedservice: SharedValueService , private userinfo:UserInfoService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
    this.checklogging = true;
    }
    else{
    this.checklogging = false;
    }
    this.router.events.subscribe(p => {
    if (p instanceof NavigationEnd) {
      const token = localStorage.getItem('token');
      if(token){
    this.checklogging = true;
    this.ngOnInit();
    }
    else{
    this.checklogging = false;
    this.ngOnInit();
    }
    }
  });
    this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showDropdown = false ; 
      if(event.url=='/home' || event.url=='/'){
        this.stylingforHOME=true;
      }else{
        this.stylingforHOME=false;
      }
    }
  });
  if(token){
      this.userinfo.getuserinfo().subscribe(userInfo => {
      console.log('User Info:', userInfo);
      if (userInfo) {
        this.email = userInfo.email;
        this.phone = userInfo.phoneNumber;
        this.username = userInfo.userName;
      }
    });
  }
}

GetAllCat(){
  this.httpheader.GetAllCat().subscribe((c)=>{
    this.Categories = c ;    
  });
  this.GetAllBrands(1);
}

GetAllBrands(catid:number){
  this.httpheader.GetAllBrands(catid).subscribe((c)=>{
    this.Brands=c;
  })
}
GotoCart(){
  const token = localStorage.getItem('token');
  if(token){
    this.router.navigate(['/cart']);
  }
  else{
    this.router.navigate(['/signin']);
  }
}
GoToLogIn(){
  this.router.navigate(['/signin']);
}
GoToUserInfo(){
  this.router.navigate(['/userinfo']);
}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  HomePage(){
    this.router.navigate(['/home']);
  }
  Search(){
    this.router.navigate(['/search']);
  }
  GetUserInfo(){
    this.userinfo.getuserinfo().subscribe((p)=>{

    })
  }
  toggleMenu() {
  this.showMenu = !this.showMenu;
}
RedirectToProductBrowse(brand:Icategory){
  console.log("before sen");
  this.sharedservice.sendData(brand.categoryId);
  console.log("after sen");
  this.router.navigate(['/productbrowse', brand.id]);
}
GoToContact(){
  this.router.navigate(['/contactus']);
}
}