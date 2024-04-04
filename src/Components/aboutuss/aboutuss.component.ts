import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  inputData:string='';

  constructor(private router:Router){}

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

    return ['Woman', 'Man', 'Kids' , 'Beauty'];
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

  printInputData() {
    this.router.navigate(['/confirmfemail'], { queryParams: { data: this.inputData } });
  }
}
