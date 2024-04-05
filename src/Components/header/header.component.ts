import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle,NgClass,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showDropdown: boolean = false;
  showMenu: boolean = false;
  stylingforHOME:boolean=false;
constructor(private router:Router){}
  ngOnInit(): void {

    this.router.events.subscribe(event => {
    //    if(this.router.url=='/home'){
    //     console.log(event);

    //   this.stylingforHOME=true;
    // }
    if (event instanceof NavigationEnd) {
      console.log('Route changed:', event.url);
      if(event.url=='/home'){
        this.stylingforHOME=true;
      }else{
        this.stylingforHOME=false;
      }
      // Now you can perform actions based on the route change.
    }
  });
}
    // console.log(this.router.url);



  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  HomePage(){}
  toggleMenu() {
  this.showMenu = !this.showMenu;
}
}