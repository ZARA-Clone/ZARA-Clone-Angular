import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChoosePaymentMethodComponent } from '../Components/choose-payment-method/choose-payment-method.component';
import { CardDetailsComponent } from '../Components/card-details/card-details.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChoosePaymentMethodComponent,CardDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grad-Project'; 
}
