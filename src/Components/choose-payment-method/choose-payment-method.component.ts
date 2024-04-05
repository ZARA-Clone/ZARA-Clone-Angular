import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-payment-method',
  standalone: true,
  imports: [],
  templateUrl: './choose-payment-method.component.html',
  styleUrl: './choose-payment-method.component.css'
})
export class ChoosePaymentMethodComponent implements OnInit {
   selectedMethod!: string;
   constructor(private router : Router){}

   ngOnInit(): void {
    this.selectedMethod = 'VISA';
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
}
