import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aboutuss',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './aboutuss.component.html',
  styleUrl: './aboutuss.component.css'
})
export class AboutussComponent {

  email: string = '';
  isValidEmail: boolean = false;
  filteredItems: string[] = [];
  selectedItems: { [key: string]: boolean } = {};
  selectedItemList: string[] = [];
  printClicked: boolean = false;
  selectedItem: string = '';
  isButtonClicked: boolean = false;

  checkEmailValidity() {
    this.isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    if (this.isValidEmail) {
      this.filteredItems = this.getFilteredItems(this.email);
      this.filteredItems.forEach(item => {
        this.selectedItems[item] = false;
      });
    } else {
      this.filteredItems = [];
      this.selectedItems = {};
    }
  }

  getFilteredItems(email: string): string[] {

    return ['Item 1', 'Item 2', 'Item 3'];
  }

  selectItem(item: string): void {
    this.selectedItems[item] = !this.selectedItems[item];
  }

  printSelectedItem(): void {
    this.isButtonClicked = true;
  }

  printSelectedItems(): void {
    this.selectedItemList = Object.keys(this.selectedItems).filter(key => this.selectedItems[key]);
    this.printClicked = true;
  }
}
