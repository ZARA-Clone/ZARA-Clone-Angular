import { Component, ElementRef, OnInit } from '@angular/core';
import { IproductDetails } from '../../Models/IproductDetails';
import { HttpProductService } from '../../Services/http-product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../Directives/click-outside.directive';
import { EgpPipe } from '../../Pipes/egp.pipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IproductBrowse } from '../../Models/IproductBrowse';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
import { listenToTriggers } from 'ngx-bootstrap/utils';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass , CommonModule , ClickOutsideDirective,CurrencyPipe,EgpPipe,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
ToggleModal:boolean=true;
isExpanded: boolean = false;
showSizes: boolean = false;
addedtoWishlist: boolean =false;
addedtoWishlist2: boolean =false;
selectedSize: string = '';
product!:IproductDetails
selectedimg!: string;
products!:IproductBrowse[]|any
newlife:any=[];
constructor(private httpproduct:HttpProductService, private activatedroute:ActivatedRoute, private elementRef : ElementRef, private dialog:MatDialog){}
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((p)=>{
      const snapid = p.get('id');
      const id = snapid ? +snapid : undefined; 
    })
    
     this.httpproduct.GetProductById(6).subscribe((p)=>{      
        this.product = p;
        this.selectedimg = this.product.images[0]
      }); 


       this.httpproduct.GetProductByBrandId(1).subscribe((p)=>{
      this.products=p;
      this.newlife= this.products.map((p: any)=> ({ ...p, showDetails: false ,wishlist:false}));
    });   
      
  }

    isSizeAvailable(sizeIndex: number): boolean | undefined {
    // Search for the size object with the given size index
    const sizeObject = this.product.sizes.find(size => size.size === sizeIndex);
    // If the size object is found and its quantity is greater than 0, return true (size is available)
    return sizeObject && sizeObject.quantity > 0;
}

    isAvailable(p: IproductDetails, size: number): boolean | undefined {
    const sizeObject = p.sizes.find(s => s.size === size);
    return sizeObject && sizeObject.quantity > 0;
}




AddToWishList(){}
AddToCart(){
  if(this.selectedSize==''){
    this.dialog.open(WarningComponent);
  }
}
AddToCartDirect(p:IproductBrowse){

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
    this.toggle(p);
  }
}
