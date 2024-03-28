import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { WarningComponent } from '../Components/warning/warning.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductDetailsComponent,WarningComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grad-Project'; 
}
