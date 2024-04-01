import { DatePipe, NgIf, formatNumber } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stripe, StripeCardElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
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
  constructor(private fb: FormBuilder) {
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
  async ConfirmPayment() {
  try {
    // Ensure that stripe is initialized
    if (!this.stripe) {
      const stripe = await this.stripePromise;
      if(stripe){
        this.stripe = stripe;
      }
      
    }
    
    // Create token
    const { token, error } = await this.stripe.createToken(this.card);
    if (error) {
      console.error('Error:', error);
    } else {
      const additionalData = {
        userid: 1, // Example additional data
        orderdate: new Date(), // Use new Date() to create a Date object
      };
      // Send the token and additional data to your backend for processing
      console.log('Token:', token);
      console.log('Additional Data:', additionalData);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


  formatCardNumber(event: any): void {
    let input = event.target.value.replace(/\s/g, '');
    if (input.length > 0) {
        input = input.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    event.target.value = input;
}

  async ngOnInit() {
    const stripe = await this.stripePromise;
    const elements = stripe?.elements();
    if(elements){
      this.card = elements.create('card');
    }
    this.card?.mount(this.cardElement.nativeElement);
  }

}
