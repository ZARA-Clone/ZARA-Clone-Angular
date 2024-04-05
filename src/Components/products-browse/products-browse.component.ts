import { Component, ElementRef, OnInit } from '@angular/core';
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
export class ProductsBrowseComponent implements OnInit{

  products2!:IproductBrowse[]|any
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
newlife:any=[]

constructor(private httpproduct:HttpProductService, private activatedroute:ActivatedRoute, private elementRef : ElementRef){}
  ngOnInit(): void {
    
    this.httpproduct.GetProductByBrandId(1).subscribe((p)=>{
      console.log(p);
      this.products2=p;
      console.log(this.products2);
      this.newlife= this.products2.map((p: any)=> ({ ...p, showDetails: false ,wishlist:false}));
    })
   
    
  }
}
