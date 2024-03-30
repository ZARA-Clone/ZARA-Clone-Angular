import { Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
 @Input() acceptingvaluefromhome!:boolean //hatst2bl feha value ayhaga
  title = 'Grad-Project'; 
}
