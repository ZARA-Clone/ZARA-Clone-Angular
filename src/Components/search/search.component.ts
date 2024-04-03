import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from '../../Models/iproduct';
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
 
    this.search. getallproduct().subscribe( {
    next:(Response:any)=>{
      console.log('products',Response);
      this.products=Response;
    }
  })
}
ngOnChanges(): void {
 console.log("cccccc");
 
  this.search.searchProduct(this.term).subscribe((data)=>{
console.log(data)
this.products=data;

  })
  
}
}
