import { Component, Input} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { LoginComponent } from '../Components/login/login.component';
import { ProductsBrowseComponent } from '../Components/products-browse/products-browse.component';
import { SearchComponent } from '../Components/search/search.component';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';


@Component({
  selector: 'app-root',
  standalone: true,
 imports: [RouterOutlet,HeaderComponent,FooterComponent,HomeComponent,LoginComponent,ProductsBrowseComponent,SearchComponent,AboutussComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
 @Input() acceptingvaluefromhome!:boolean //hatst2bl feha value ayhaga
  title = 'Grad-Project'; 
}
