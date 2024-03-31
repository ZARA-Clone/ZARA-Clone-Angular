import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from '../../models/iproduct';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
 products:IProduct[]=[]
  term:string=''
  data: IProduct[] = [];
constructor(private search:SearchService){}

ngOnInit(): void {
 
    this.search. getallproduct().subscribe((responseData) => {
    next:(Response:any)=>{
      console.log('products',Response.data);
      this.products=Response.data;
    }
  })
}
}
