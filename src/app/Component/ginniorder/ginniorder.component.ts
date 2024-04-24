import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';

@Component({
  selector: 'app-ginniorder',
  templateUrl: './ginniorder.component.html',
  styleUrl: './ginniorder.component.css'
})
export class GinniorderComponent implements OnInit{
  orderList!: any[];

  constructor(private paymentService : PaymentService){}

  ngOnInit (){
    this.getOrder();
  }

  getOrder(){
    this.paymentService.getOrders().subscribe({
      next: (res) => {
        this.orderList = res;
        console.log(this.orderList);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

}
