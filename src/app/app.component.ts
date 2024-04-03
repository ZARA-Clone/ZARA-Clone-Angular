import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AboutussComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grad-Project'; 
}
