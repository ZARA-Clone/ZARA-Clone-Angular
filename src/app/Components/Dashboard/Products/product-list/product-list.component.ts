import { Component } from '@angular/core';
import { ProductOperationsService } from '../../../../Services/Dashboard/product-operations.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[] = []
  totalCount: number = 0
  pageIndex: number = 1
  pageSize: number = 2
  currentPage: any;

  constructor(private _prodductsService: ProductOperationsService) {
    this.getData(this.pageIndex - 1, this.pageSize)
  }
  getData(pageIndex: number, pageSize: number) {
    this._prodductsService.getAllInPagination(pageIndex, pageSize)
      .subscribe({
        next: (data) => {
          (this.totalCount = data.totalCount);
          (this.products = data.items);
          (console.log(data));
          (console.log(data.pageIndex));
        },
        error: (error) => { console.log(error) }
      })
  }
  onPageChange(event: any) {
    this.pageIndex = event;
    this.getData(this.pageIndex - 1, this.pageSize)
  }
}

