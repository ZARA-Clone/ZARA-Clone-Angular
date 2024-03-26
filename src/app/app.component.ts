import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsBrowseComponent } from '../Components/products-browse/products-browse.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductsBrowseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grad-Project'; 
}
