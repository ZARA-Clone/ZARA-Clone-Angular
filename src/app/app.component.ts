import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditUserInfoComponent } from '../Components/edit-user-info/edit-user-info.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EditUserInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grad-Project'; 
}
