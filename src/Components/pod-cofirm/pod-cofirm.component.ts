import { Component, OnInit } from '@angular/core';
import { HttpPaymentService } from '../../Services/http-payment.service';

@Component({
  selector: 'app-pod-cofirm',
  standalone: true,
  imports: [],
  templateUrl: './pod-cofirm.component.html',
  styleUrl: './pod-cofirm.component.css'
})
export class PODCOFIRMComponent implements OnInit {
  constructor(private httppayment:HttpPaymentService){}
  ngOnInit(): void {
    this.httppayment.GetOrderDetails().subscribe((p)=>{
      this.products=p;
    })
  }
  products:any[]=[];
  
ConfirmPayment(){
  
}
}
