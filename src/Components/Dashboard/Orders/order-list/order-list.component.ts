import { Component } from '@angular/core';
import { OrdersService } from '../../../../Services/Dashboard/orders.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink, NgxPaginationModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  orders: any
  totalCount: number = 0
  pageIndex: number = 1
  pageSize: number = 2
  currentPage: number = 0;
  constructor(private _orderService: OrdersService) {
    this.getOrders(this.pageIndex - 1, this.pageSize)
  }

  getOrders(pageIndex: number, pageSize: number) {
    this._orderService.getWithPagination(pageIndex, pageSize)
      .subscribe({
        next: (data) => {
          console.log(this.orders)
          this.orders = data.items
          this.totalCount = data.totalCount
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  onPageChange(event: any) {
    this.pageIndex = event
    this.getOrders(this.pageIndex - 1, this.pageSize)
  }
}
