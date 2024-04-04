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
constructor(private _search:SearchService){}

ngOnInit(): void {
 
    this._search. getallproduct().subscribe( {
    next:(Response:any)=>{
      console.log('products',Response);
      this.products=Response;
    }
  })
}

search():void{

this._search.searchProduct(this.term).subscribe((response)=>{

console.log('product',response)

this.products=response;

})
}
  

}
