import { Component, ElementRef, OnInit } from '@angular/core';
import { IproductDetails } from '../../Models/IproductDetails';
import { HttpProductService } from '../../Services/http-product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../Directives/click-outside.directive';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass , CommonModule , ClickOutsideDirective],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
ToggleModal:boolean=true;
isExpanded: boolean = false;
showSizes: boolean = false;
addedtoWishlist: boolean =false;
addedtoWishlist2: boolean =false;
selectedSize!: string
selectedimg: string = 'https://static.zara.net/photos///2023/I/0/2/p/0706/540/800/2/w/750/0706540800_2_3_1.jpg?ts=1699871674095';
product!:IproductDetails | any
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




AddToWishList(){}
AddToCart(){
  if(this.selectedSize==''){
    
  }
}
toggleContent(event: Event): void {
    event.preventDefault(); // Prevent the default anchor behavior
    this.isExpanded = !this.isExpanded;
  }
Displayimg(src:any){
this.selectedimg=src;
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
  toggle(p:any) {
    if(p.showDetails==true){
        p.showDetails = !p.showDetails;
       
    }
    //this.showSizes = !this.showSizes;
  }
ToggleWishList(p:any){
  p.wishlist=!p.wishlist
}
ToggleWishList2(){
this.addedtoWishlist2=!this.addedtoWishlist2;
}
selectSize(size: string) {
  this.selectedSize = size; 
}
hideDiv(p:any){
    //this.elementRef.nativeElement.style.display = 'block';
    // const x = document.getElementById('sizing-container');
    // console.log(x);
    // x?.classList.add('sizing-container');
    //console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    this.toggle(p);
  }
}
