import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { PaymentService } from '../../Services/payment.service';
import { log } from 'console';

@Component({
  selector: 'app-ginnidetailorder',
  templateUrl: './ginnidetailorder.component.html',
  styleUrl: './ginnidetailorder.component.css'
})
export class GinnidetailorderComponent {
  orderId: any;
  orderDetails: any;

  constructor(private route: ActivatedRoute,  private productService : ProductService, private paymentService : PaymentService) { }

  ngOnInit(): void {
     // Get the order name from route parameters
     this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(this.orderId);

      this.getOrderDetails(this.orderId);
    });
  }

  getOrderDetails(orderId : string) : void {
    this.paymentService.getOrderByID(orderId).subscribe({
      next: (data: any) => {
        this.orderDetails = data;
        console.log(this.orderDetails)
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }

}
