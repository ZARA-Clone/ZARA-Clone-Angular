import { Injectable } from '@angular/core';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: IProduct[];
  constructor() {
  }

  getAllProducts(): IProduct[] {
    return this.products;
  }
}
