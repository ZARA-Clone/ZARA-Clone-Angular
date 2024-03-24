import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showDropdown: boolean = false;
  showMenu: boolean = false;

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }
  HomePage(){}
  toggleMenu() {
  this.showMenu = !this.showMenu;
}
}
