import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProductService } from '../../Services/http-product.service';
import { IproductBrowse } from '../../Models/IproductBrowse';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../Directives/click-outside.directive';

@Component({
  selector: 'app-product-browse',
  standalone: true,
  imports: [NgClass,ClickOutsideDirective],
  templateUrl: './products-browse.component.html',
  styleUrl: './products-browse.component.css'
})
export class ProductsBrowseComponent {
  product!:IproductBrowse|any
value:boolean=true;
firstlayout(){
  this.value=true;
}
secondlayout(){
  this.value=false;
}
toggleSizes(event:Event,p:any): void {
  event.stopPropagation();
  //this.showSizes = !this.showSizes;
  p.showDetails = !p.showDetails;
   for (let index = 0; index < this.newlife.length; index++) {
    if(this.newlife[index].id!=p.id){
      this.newlife[index].showDetails=false;
    }
      }
}
ToggleWishList(p:any){
p.wishlist=!p.wishlist
}
toggle(p:any) {
  if(p.showDetails==true){
      p.showDetails = !p.showDetails;
  }
}
hideDiv(p:any){
  this.toggle(p);
}



products=[
  {
    id:1,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:2,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:3,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:4,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:5,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:6,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },
  {
    id:7,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },{
    id:80,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  },{
    id:80,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  }
  ,{
    id:11,
    img:'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095',
    name:'COMFORT SUIT TROUSERS',
    price:'2,090 EGP'
  }
  

]
newlife:any=[];
constructor(private httpproduct:HttpProductService, private activatedroute:ActivatedRoute, private elementRef : ElementRef){}
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((p)=>{
      const snapid = p.get('id');
      const id = snapid ? +snapid : undefined;
      this.product = this.httpproduct.GetProductById(id);
    })
    this.newlife= this.products.map(p=> ({ ...p, showDetails: false ,wishlist:false}));
    
  }

}
