import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProductService } from '../../Services/http-product.service';
import { IproductBrowse } from '../../Models/IproductBrowse';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../Directives/click-outside.directive';
import { SharedValueService } from '../../Services/shared-value.service';
import { HttpHeaderService } from '../../Services/http-header.service';
import { Icategory } from '../../Models/ICategory';
import { Subscription } from 'rxjs';
import { EgpPipe } from '../../Pipes/egp.pipe';
import { IproductWishList } from '../../Models/IproductWishList';
import Swal from 'sweetalert2';
import { IproductDetails } from '../../Models/IproductDetails';

@Component({
  selector: 'app-product-browse',
  standalone: true,
  imports: [NgClass,ClickOutsideDirective,EgpPipe],
  templateUrl: './products-browse.component.html',
  styleUrl: './products-browse.component.css'
})
export class ProductsBrowseComponent implements OnInit{

products2!:IproductBrowse[]|any
product!:IproductBrowse|any
value:boolean=true;
newlife:any=[]
buttonsarr:Icategory[] | any
private subscription!: Subscription;
private previousValue: any;
receivedData: any;
wishlistProducts!: IproductWishList[] | any
selectedSize: string = '';
constructor(private httpproduct:HttpProductService, private activatedroute:ActivatedRoute, private elementRef : ElementRef,private sharedservice:SharedValueService,private httpheader:HttpHeaderService,private router :Router){}

ngOnInit(): void {
  const previousValue = localStorage.getItem('previousValue');
  console.log(previousValue);
  
  if (previousValue) {
    this.previousValue = JSON.parse(previousValue);
  } else {
    this.previousValue = null;
  }

  this.subscription = this.sharedservice.data$.subscribe(data => {    
    if (data) {
      this.previousValue = data;
      this.receivedData = data;
      localStorage.setItem('previousValue', JSON.stringify(this.previousValue));
    } else {
      this.receivedData = this.previousValue;
    }
    
    this.httpheader.GetAllBrands(this.receivedData).subscribe((b) => {
      this.buttonsarr = b;
    });
  });

  // Subscribe to route parameters
  this.activatedroute.paramMap.subscribe((p) => {
    const snapid = p.get('id');
    const id = snapid ? +snapid : undefined;
    this.httpproduct.GetProductByBrandId(id).subscribe((p) => {
      this.products2 = p;
      this.newlife = this.products2.map((p: any) => ({ ...p, showDetails: false, wishlist: false }));

      this.httpproduct.GetAllWishList().subscribe((wishlistProducts) => {
        this.wishlistProducts = wishlistProducts;
        this.newlife.forEach((product: any) => {          
          if (this.wishlistProducts.some((wishlistProduct: IproductWishList) => wishlistProduct.id === product.id)) {
            product.wishlist = true;        
          }
        });
      });
    });
  });
}




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
  selectSize(size: string) {
    this.selectedSize = size;
  }

  
  ClickedButton(id:number){
    this.httpproduct.GetProductByBrandId(id).subscribe((p)=>{
      this.products2=p;
      this.newlife= this.products2.map((p: any)=> ({ ...p, showDetails: false ,wishlist:false}));
    })
  }
    RedirectToProductDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
    AddToCartDirect(id:number,size: number) {
      const token = localStorage.getItem('token');
      if(token == null){
        this.router.navigate(['/signin']);
      }else{
            this.httpproduct.AddToCart(id, size).subscribe((p) => {
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
  AddToWishList(id: number) {
    this.httpproduct.AddToWishList(id).subscribe((p) => {
      console.log(p);
      Swal.fire({
        position: "center",
        title: "Added To Wishlist",
        showConfirmButton: false,
        timer: 1500
      });
      this.RecallWishList();
    })


  }
  RemoveFromWishList(id: number) {
    this.httpproduct.removeFromWishList(id).subscribe((p) => {
      Swal.fire({
        position: "center",
        title: "Removed From Wishlist",
        showConfirmButton: false,
        timer: 1500
      });
      this.RecallWishList();
    })
  }
  RecallWishList(){
    this.httpproduct.GetAllWishList().subscribe((p)=>{
      this.wishlistProducts = p;
    })
  }
  isAvailable(p: IproductDetails, size: number): boolean | undefined {
    const sizeObject = p.sizes.find(s => s.size === size);
    return sizeObject && sizeObject.quantity > 0;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
