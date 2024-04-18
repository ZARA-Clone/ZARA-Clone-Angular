import { Component, OnInit } from '@angular/core';
import { HttpPaymentService } from '../../Services/http-payment.service';
import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { DatePipe, NgStyle } from '@angular/common';
import { Icart } from '../../Models/icart';
import { DecodingService } from '../../Services/decoding.service';
import { CartServiceService } from '../../Services/cart-service.service';
import { Router } from '@angular/router';
import { RefreshHeaderService } from '../../Services/refresh-header.service';

@Component({
  selector: 'app-pod-cofirm',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './pod-cofirm.component.html',
  styleUrl: './pod-cofirm.component.css'
})
export class PODCOFIRMComponent implements OnInit {
  constructor(private httppayment:HttpPaymentService,private auth:DecodingService , private cartService:CartServiceService,private router: Router,private refresh:RefreshHeaderService){
    emailjs.init("Cga4GFBNn2Hqi1d9h");
  }
  ngOnInit(): void {
    this.httppayment.GetOrderDetails().subscribe((p)=>{
      this.products=p;
    })
    this.FetchApi();
  }
  products:any[]=[];
  currentDate: Date = new Date();
  totalPrice!:number
  cartItems:Icart[]=[]


    FetchApi(): void {
  
  const userId =this.auth.extractUserIdFromToken(); 
  this.cartService.getCartItems(userId).subscribe({
    next: (cartItems) => {     
      console.log(cartItems);
      
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


ConfirmPayment() {
  this.httppayment.PayOnDelivery().subscribe((p)=>{
    this.ngOnInit();
    this.refresh.triggerRefresh();
    console.log(p);
      var params = {
    sendername: "Zara",
    to: "mennadeyaam@gmail.com",
    subject: "Payment Confirmation",
    message: `Thank You For Dealing With Us.
              Your Order Has Been Confirmed.
              You Will Receive Your Order Within 3-5 Days.
              We Will Contact With You When Your Order Status Updated.`,
  };
  var serviceId = "service_qgwmgli";
  var templateID = "template_51m8wjo";
  emailjs.send(serviceId, templateID, params)
    .then((res) => {
          Swal.fire({
          title:`Thanks For Dealing With ZARA`,
          text:`You Will Receive Email With The Details Soon`,
          showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
            `
          },
        hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
          `
        }
        });
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
    });
    
  })
}
}
