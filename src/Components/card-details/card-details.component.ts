import { DatePipe, NgIf, formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stripe, StripeCardElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CheckoutWarningComponent } from '../checkout-warning/checkout-warning.component';
import { HttpClient } from '@angular/common/http';
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
  constructor(private fb: FormBuilder,private matdia:MatDialog, private http:HttpClient) {
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
      const additionalData = {
        orderdate: new Date(), // Use new Date() to create a Date object
      };

      // Send the token and additional data to your backend for processing
      this.http.post('https://localhost:7248/api/Checkout/process-payment', { token, additionalData })
      .subscribe(response => {

      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

}
