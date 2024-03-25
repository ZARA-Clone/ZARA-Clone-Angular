import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import * as emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  value:boolean=false;
viewButton(){
    this.value=true;
}
constructor(){
  emailjs.init("Cga4GFBNn2Hqi1d9h");
}

sendMail() {
  var menna = (document.getElementById("form5Example24") as HTMLInputElement)
  var mennatwo=menna.value;
  var params = {
    sendername: "Zara",
    to: mennatwo,
    subject: "Newsletter Subscription",
    message: "Thank You For Subscription To Our Newsletter",
  };
  var serviceId = "service_qgwmgli"; // Replace with your EmailJS service ID
  var templateID = "template_51m8wjo"; // Replace with your EmailJS template ID
  emailjs
    .send(serviceId, templateID, params)
    .then((res) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Email sent successfully!",
        confirmButtonColor: "#007bff",
        confirmButtonText: "OK",
      });
      menna.value='';
    })
    .catch((error: any) => {
      console.error('Error sending email:', error);
      // Handle error, e.g., show an error message
    });
}
}
