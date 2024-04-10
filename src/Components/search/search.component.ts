import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IProduct } from '../../Models/iproduct';
import { SearchService } from '../../Services/search.service';
import { Router } from '@angular/router';
import { IproductBrowse } from '../../Models/IproductBrowse';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
 products!:IproductBrowse[]|any
  term:string=''
  data: IproductBrowse[] = [];
constructor(private _search:SearchService,private router:Router){}

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
RedirectToProductDetails(id: number) {
  this.router.navigate(['/product', id]);
}
}
