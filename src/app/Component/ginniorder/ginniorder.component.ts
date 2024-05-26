import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../Services/payment.service';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-ginniorder',
  templateUrl: './ginniorder.component.html',
  styleUrl: './ginniorder.component.css'
})
export class GinniorderComponent implements OnInit{
  orderList!: any[];

  constructor(private paymentService : PaymentService, private orderService: OrderService){}

  ngOnInit (){
    this.getOrder();
  }

  getOrder(){
    const UserID = sessionStorage.getItem('UserID');

    this.orderService.getOrder(UserID).subscribe({
      next: (res : any) => {
        console.log(res.value);
        this.orderList = res.value;
        console.log(this.orderList);
      },
      error: (err) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

}
