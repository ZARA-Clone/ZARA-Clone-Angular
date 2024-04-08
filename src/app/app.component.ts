import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { HeaderComponent } from '../Components/header/header.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { LoginComponent } from '../Components/login/login.component';
import { ProductsBrowseComponent } from '../Components/products-browse/products-browse.component';
import { SearchComponent } from '../Components/search/search.component';
import { AboutussComponent } from '../Components/aboutuss/aboutuss.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { WarningComponent } from '../Components/warning/warning.component';
import { EditUserInfoComponent } from '../Components/edit-user-info/edit-user-info.component';
import { ChoosePaymentMethodComponent } from '../Components/choose-payment-method/choose-payment-method.component';
import { CardDetailsComponent } from '../Components/card-details/card-details.component';
import { CartComponent } from "../Components/cart/cart.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, ProductsBrowseComponent, SearchComponent, AboutussComponent, ProductDetailsComponent, WarningComponent, EditUserInfoComponent, ChoosePaymentMethodComponent, CardDetailsComponent, CartComponent]
})
export class AppComponent {
  @Input() acceptingvaluefromhome!: boolean //hatst2bl feha value ayhaga
  title = 'Grad-Project';
}
