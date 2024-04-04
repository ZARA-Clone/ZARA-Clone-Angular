import { Component, ElementRef, OnInit } from '@angular/core';
import { IproductDetails } from '../../Models/IproductDetails';
import { HttpProductService } from '../../Services/http-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../Directives/click-outside.directive';
import { EgpPipe } from '../../Pipes/egp.pipe';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { IproductBrowse } from '../../Models/IproductBrowse';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WarningComponent } from '../warning/warning.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


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
constructor(private httpproduct:HttpProductService, private activatedroute:ActivatedRoute, private elementRef : ElementRef, private dialog:MatDialog, private router:Router){}
  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((p)=>{
      const snapid = p.get('id');
      const id = snapid ? +snapid : undefined; 
      this.httpproduct.GetProductById(1).subscribe((p)=>{      
        this.product = p;
        this.selectedimg = this.product.images[0]
      }); 
      this.httpproduct.GetProductByBrandId(1).subscribe((p)=>{
      this.products=p;
      this.newlife= this.products.map((p: any)=> ({ ...p, showDetails: false ,wishlist:false}));
      this.newlife = this.newlife.filter((product:IproductDetails) => product.id !== 1)
    });   

    })  
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


AddToCart(){
  if(this.selectedSize==''){
    this.dialog.open(WarningComponent);
  }
  else{
    let size;
    if(this.selectedSize == 'S')
    size = 0;
    else if (this.selectedSize == 'M')
    size = 1;
    else if (this.selectedSize == 'L')
    size = 2;
    else(this.selectedSize == 'XL')
    size = 3;
    this.httpproduct.AddToCart(5,size).subscribe((p)=>{
      Swal.fire({
      title: "Product Added Successfully",
      showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster`
      },
      hideClass: {
      popup: `
      animate__animated
      animate__hinge
      animate__slower`
      }
    });
    })
  }
}
AddToCartDirect(size:number){
  this.httpproduct.AddToCart(5,size).subscribe((p)=>{
      Swal.fire({
      title: "Product Added Successfully",
      showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster`
      },
      hideClass: {
      popup: `
      animate__animated
      animate__hinge
      animate__slower`
      }
    });
  })
}

AddToWishList(id:number){
  this.httpproduct.AddToWishList(id).subscribe((p)=>{
  Swal.fire({
  position: "center",
  title: "Added To Wishlist",
  showConfirmButton: false,
  timer: 1500
    });
  })
  
  
}
RemoveFromWishList(id:number){
  this.httpproduct.removeFromWishList(id).subscribe((p)=>{
  Swal.fire({
  position: "center",
  title: "Removed From Wishlist",
  showConfirmButton: false,
  timer: 1500
    });
  })  
}

RedirectToProductDetails(id:number){
  this.router.navigate(['/product', id]);
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
