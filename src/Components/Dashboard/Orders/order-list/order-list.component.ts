import { Component } from '@angular/core';
import { OrdersService } from '../../../../Services/Dashboard/orders.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  orders: any
  constructor(private _orderService: OrdersService) {
    this.getOrders()
  }

  getOrders() {
    this._orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data
        console.log(this.orders)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
