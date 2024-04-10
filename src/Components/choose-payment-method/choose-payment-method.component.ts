import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartComponent } from "../cart/cart.component";
import { Icart } from '../../Models/icart';
import { UserService } from '../../Services/user-service.service';
import { DecodingService } from '../../Services/decoding.service';
import { CartServiceService } from '../../Services/cart-service.service';

@Component({
    selector: 'app-choose-payment-method',
    standalone: true,
    templateUrl: './choose-payment-method.component.html',
    styleUrl: './choose-payment-method.component.css',
    imports: [CartComponent]
})
export class ChoosePaymentMethodComponent implements OnInit {
   selectedMethod!: string;
   totalPrice!:number
   cartItems:Icart[]=[]
   constructor(private router : Router,private auth:DecodingService , private cartService:CartServiceService  ){}
   ngOnInit(): void {
    this.selectedMethod = 'VISA';
    this.FetchApi();
  }
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
  RedirectTo(){
    if(this.selectedMethod == 'VISA' || this.selectedMethod == 'MASTERCARD'){
      this.router.navigate(['carddetails']);
    }
    else if(this.selectedMethod == 'PAY_ON_DELIVERY'){
      this.router.navigate(['podconfirm']);
    }
  }
  selectPayment(method: string) {
    this.selectedMethod = method;
  }
  receiveTotalPrice(totalPrice: number) {
    this.totalPrice = totalPrice; // Receive the total price emitted from cart component
  }
}
