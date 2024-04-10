import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { WishlistService } from '../../Services/wishlist.service';
import { IProduct } from '../../Models/iproduct';
import { Router } from '@angular/router';
import { Size } from '../../Enums/Size';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
productswishlist:IProduct[]=[]

constructor(private _wishlist:WishlistService,private router:Router){}
ngOnInit(): void { // dy el btgbly el data mn webapi awl ma el page t3ml load
this.getapi()
}
getapi(){
  this._wishlist.getwishlistproduct().subscribe((product:IProduct[])=>{this.productswishlist=product})
  console.log(this.productswishlist)
}

removeproduct(product:IProduct):void{
  this._wishlist.removeWishListproduct(product.id).subscribe(()=>{this.productswishlist=this.productswishlist.filter(prodremove=>prodremove.id!==product.id) })
  this.deleteFromHtml(product);
}

deleteFromHtml(product: IProduct): void {
  // Implement logic to delete product from HTML
  const index = this.productswishlist.indexOf(product);
  if (index !== -1) {
    this.productswishlist.splice(index, 1);
  }
}

onclick(id: number) {
  this.router.navigate(['/product', id]);
}

}
