
import { ConfirmationDialogComponentComponent } from '../confirmation-dialog-component/confirmation-dialog-component.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Icart } from '../../Models/icart';
import { CartServiceService } from '../../Services/cart-service.service';
import { DecodingService } from '../../Services/decoding.service';
import { MatDialog } from '@angular/material/dialog';






type Sizes = {
  [key: number]: string;
};
@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: []
})
export class CartComponent implements OnInit{
  cartItems:Icart[]=[]
  totalPrice!: number
     outofstock:boolean=false

  sizes: Sizes = {
    0: 'Small',
    1: 'Medium',
    2: 'Large',
    3: 'Extra Large'
  };



ngOnInit(): void {
  this.FetchApi();
}



constructor(private cartService:CartServiceService , private mat:MatSnackBar ,private auth:DecodingService,private dialog: MatDialog){}

FetchApi(): void {
  
  const userId =this.auth.extractUserIdFromToken(); 
  this.cartService.getCartItems(userId).subscribe({
    
    next: (cartItems) => {
     
      this.cartItems = cartItems;
     
    },
    error: (error) => {
      console.error('Error fetching cart items:', error);
      
      alert('An error occurred while fetching cart items. Please try again later.');
    }
  });
}


increaseQuantity(item: Icart): void {
  console.log(item)
  // Check availability before increasing quantity
  this.cartService.checkAvailability(item.id, item.size).subscribe((availableQuantity: number) => {
    // Check if the requested quantity exceeds the available stock
    if (item.quantity < availableQuantity) {
      // Product is available, increase quantity
      item.quantity++;
      const userId =this.auth.extractUserIdFromToken();
      // Update quantity in the database for authenticated user
      this.cartService.updateProductQuantity(userId , item.id, item.quantity,item.size).subscribe(() => {
        this.mat.open("Ops!, error occurred", 'close', { duration: 2000 });
      }, (error) => {
        this.mat.open("saving changes ", 'close', { duration: 2000 });
      });
    } else {
      this.mat.open("out of stock", 'close', { duration: 2000 });
      item.outofstock = true;
      
    }
  });
}


decreaseQuantity(item: Icart): void {
  // Check availability before decreasing quantity
  this.cartService.checkAvailability(item.id, item.size).subscribe((availableQuantity: number) => {
    // Check if the requested quantity is greater than 1
    if (item.quantity > 1) {
      item.outofstockk=false;
      if(item.quantity==1){
        item.outofstockk=true;
      }
      // Product is available, decrease quantity
      item.quantity--;
      item.outofstock = false;
      // Check authentication status before updating quantity in the database
      // if (this.decodin.isUserAuthenticated()) {
      //   // User is authenticated, get the user ID
         const userId =this.auth.extractUserIdFromToken();

        // Update quantity in the database for authenticated user
        this.cartService.updateProductQuantity(userId , item.id, item.quantity,item.size).subscribe(() => {
          this.mat.open("ops error ", 'close', { duration: 3000 });
        }, (error) => {
          this.mat.open("saving changes..",'close', { duration: 3000 });})   ///ana 3ksahom 3mtn bs ana bigeli error law ng7 aw hata failed
      // } else {
      //   // User is not authenticated (e.g., for anonymous user)
      //   console.log('Quantity updated locally for anonymous user');
      // }
    } 
  });
}





removeItem(item: Icart): void {
  const index = this.cartItems.findIndex(i => i.id === item.id && i.size === item.size);
  if (index !== -1) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '250px',
      data: 'Are you sure you want to delete this item?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
       
        const userId = this.auth.extractUserIdFromToken();
        this.cartService.deleteItem(userId, item.id, item.size).subscribe(
          () => {
            // Handle successful deletion
            this.mat.open("Item deleted successfully", 'close', { duration: 2000 });
          
            this.cartItems.splice(index, 1);
          },
          (error) => {
            
            console.error('Error deleting item:', error);
            this.mat.open("Error deleting item", 'close', { duration: 2000 });
          }
        );
      }
    });
  }
}


  

getTotalPrice(): number {
  if (!this.cartItems || this.cartItems.length === 0) {
    return 0;
  }
  return this.cartItems.reduce((total, item) => {
    // Adjust the calculation according to your actual data structure
    this.totalPrice = total + (item.price * item.quantity)
    return this.totalPrice ;
  }, 0);
}







addToWishList(item:Icart): void {
  // Create an object containing userId and productId

  const userId =this.auth.extractUserIdFromToken();
  this.cartService.addtowishlist(item.id,userId).subscribe(
    (response) => {
    
      console.log('Item added to wishlist:', response);
      
    },
    (error) => {
      
      console.error('Failed to add item to wishlist:', error);
      
    }
  );
}


}







