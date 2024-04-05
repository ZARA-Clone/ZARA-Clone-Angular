import { Component, OnInit } from '@angular/core';
import { HttpPaymentService } from '../../Services/http-payment.service';
import Swal from 'sweetalert2';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-pod-cofirm',
  standalone: true,
  imports: [],
  templateUrl: './pod-cofirm.component.html',
  styleUrl: './pod-cofirm.component.css'
})
export class PODCOFIRMComponent implements OnInit {
  constructor(private httppayment:HttpPaymentService){
    emailjs.init("Cga4GFBNn2Hqi1d9h");
  }
  ngOnInit(): void {
    this.httppayment.GetOrderDetails().subscribe((p)=>{
      this.products=p;
    })
  }
  products:any[]=[];

sendMail() {
  this.httppayment.PayOnDelivery().subscribe((p)=>{
      var params = {
    sendername: "Zara",
    to: "mennadeyaam@gmail.com",
    subject: "Payment Confirmation",
    message: `Thank You For Dealing With Us.
              Your Order Has Been Confirmed.
              You Will Receive Your Order Within 3-5 Days.
              We Will Contact With You When Your Order Status Updated.`,
  };
  var serviceId = "service_qgwmgli";
  var templateID = "template_51m8wjo";
  emailjs
    .send(serviceId, templateID, params)
    .then((res) => {
          Swal.fire({
          title:`Thanks For Dealing With ZARA`,
          text:`You Will Receive Email With The Details Soon`,
          showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
            `
          },
        hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
          `
        }
        });
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
    });
    
  })
}
}
