import { Component, OnDestroy, OnInit, Output  } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppComponent } from '../../app/app.component';
import { RefreshHeaderService } from '../../Services/refresh-header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,AppComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
constructor(private refresh:RefreshHeaderService){}
  ngOnInit(): void {
    this.refresh.triggerRefresh();
  }

}
