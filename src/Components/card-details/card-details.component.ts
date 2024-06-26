import { DatePipe, NgIf, formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stripe, StripeCardElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CheckoutWarningComponent } from '../checkout-warning/checkout-warning.component';
import { HttpClient } from '@angular/common/http';
import { HttpPaymentService } from '../../Services/http-payment.service';
import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { DecodingService } from '../../Services/decoding.service';
import { CartServiceService } from '../../Services/cart-service.service';
import { Icart } from '../../Models/icart';
import { Router } from '@angular/router';
import { RefreshHeaderService } from '../../Services/refresh-header.service';
import { async } from 'rxjs';
@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf,DatePipe],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{
cardinfo: FormGroup;
cardNumberPattern: string = '^\\d{4} \\d{4} \\d{4} \\d{4}$';
stripePromise = loadStripe('pk_test_51OzU9vP6V1Tz8l55LKIXs6RPxoFVcstmUR4SKiWV1p1iDNSti5ugl9tMBHJA0RQGgkmdC0oN38DbdmusBXB3ez6700lFowqjHe');
  @ViewChild('cardElement') cardElement!: ElementRef;
  @ViewChild('months') monthsSelect!: ElementRef;
  @ViewChild('years') yearsSelect!: ElementRef;
  @ViewChild('cardholder') cardholderInput!: ElementRef;
  @ViewChild('cvv') cvvInput!: ElementRef;

  stripe!: Stripe;
  card!: StripeCardElement | StripeCardNumberElement;
  currentDate: Date = new Date();
  products:any[]=[];
  totalPrice!:number
  cartItems:Icart[]=[]
  constructor(private fb: FormBuilder,private matdia:MatDialog, private http:HttpClient,private httppayment:HttpPaymentService,private auth:DecodingService , private cartService:CartServiceService, private router: Router,private refresh:RefreshHeaderService) {
    emailjs.init("Cga4GFBNn2Hqi1d9h");
     this.httppayment.GetOrderDetails().subscribe((p)=>{
      this.products=p;
     })
    this.currentDate = new Date();
    this.cardinfo = this.fb.group({
      cardnumber: ['', [Validators.required, Validators.pattern(this.cardNumberPattern)]],
      cardholder: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
      months: ['', Validators.required],
      years: ['', Validators.required]
    });
  }

  

  getIsError(controlName: string, errorType: string) {
    const control = this.cardinfo.get(controlName);
    return control && control.hasError(errorType);
  }

    async ngOnInit() {
    const stripe = await this.stripePromise;
    const elements = stripe?.elements();
    if(elements){
      this.card = elements.create('card');
    }
    this.card?.mount(this.cardElement.nativeElement);
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

async ConfirmPayment() {
  try {
    if (!this.stripe) {
      const stripe = await this.stripePromise;
      if (stripe) {
        this.stripe = stripe;
      }
    }

    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      this.matdia.open(CheckoutWarningComponent);
    } else {
      const Data ={
        token: token ,
      }
      console.log(Data);
      
      
      // Send the token and additional data to your backend for processing
      this.http.get('https://localhost:7248/api/Checkout/Pay-On-Delivery')
      .subscribe(response => {
        this.ngOnInit();
        this.refresh.triggerRefresh();
        this.sendMail()
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
     });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

sendMail() {
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
  emailjs
    .send(serviceId, templateID, params)
    .then((res) => {
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
    });
}
}
