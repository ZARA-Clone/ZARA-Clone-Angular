import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { WishlistService } from '../../Services/wishlist.service';
import { IProduct } from '../../Models/iproduct';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
productswishlist:IProduct[]=[]
constructor(private _wishlist:WishlistService){}
ngOnInit(): void { // dy el btgbly el data mn webapi awl ma el page t3ml load
this.getapi()
}
getapi(){
  this._wishlist.getwishlistproduct().subscribe((product:IProduct[])=>{this.productswishlist=product})
}

removeproduct(product:IProduct):void{
  this._wishlist.removeWishListproduct(product.id).subscribe(()=>{this.productswishlist=this.productswishlist.filter(prodremove=>prodremove.id!==product.id) })
}

}
