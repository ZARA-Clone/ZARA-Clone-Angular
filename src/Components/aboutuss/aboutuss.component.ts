import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

// @Component({
//   selector: 'app-aboutuss',
//   standalone: true,
//   imports: [FormsModule,CommonModule,DialogModule],
//   templateUrl: './cart.component.html',
//   styleUrl: './cart.component.css'
// })

@Component({
  selector: 'app-aboutuss',
  standalone: true,
  imports: [FormsModule,CommonModule,DialogModule],
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


  visible: boolean = false;
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

  acceptTerms: boolean = false;
  isSelected: boolean = false;
  showErrorDialog: boolean = false;
  showTermsDialog: boolean = false;
  SetSelected() {
    this.isSelected = true;
  }
ToogleTerms() {
    this.acceptTerms = !this.acceptTerms;
    console.log(this.acceptTerms);
  }
  // checkInputs() {
     
  //      if (!this.acceptTerms) {
  //       this.showTermsDialog = true;
  //       return;
  //     }
  //     else if (!this.isSelected) {
  //       this.showErrorDialog = true;
  //       return;
  //     }
  //     else {
  //       this.router.navigate(['/confirmfemail'], { queryParams: { data: this.inputData } });
  //      }
  //   }
  checkInputs() {
    if (!this.acceptTerms) {
      this.showTermsDialog = true;
    } else if (!this.isSelected) {
      this.showErrorDialog = true;
    } else {
      this.router.navigate(['/confirmfemail'], { queryParams: { data: this.inputData } });
    }
  }
  
  
    printInputData() {
      this.router.navigate(['/confirmfemail'], { queryParams: { data: this.inputData } });
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

  
  display: boolean = false;

  showDialog() {
    this.visible = true;
  }

}