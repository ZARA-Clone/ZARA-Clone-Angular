import { Component, OnDestroy, OnInit, Output  } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  // @Output() ayhaga:boolean=false; //hab3tha
  // constructor(private router:Router){}
  // ngOnDestroy(): void {
  //   console.log("kkkkk");
  //   this.ayhaga=false;
  // }
  // ngOnInit(): void {
  //  if(this.router.url=='/home'){
  //   console.log("mmmmm");
  //   this.ayhaga=true;
  //  }
  // }
  // constructor(private router:Router){}
  // ngOnInit(): void {
  //   console.log(this.router.url);
  // }

}
