import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../Services/Dashboard/orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderDto } from '../../../../Models/Dashboard/Orders/OrderDto';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

  order: OrderDto = new OrderDto()

  constructor(private _ordersService: OrdersService
    , private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.subscribe((param) => {
      let idAsString = param.get('id');
      let id = Number(idAsString);
      this.getOrder(id)
    })
  }

  getOrder(id: number) {
    this._ordersService.getOrderDetails(id).subscribe({
      next: (data) => {
        console.log("data", data)
        this.order = data
        this.order.id = data.id
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
