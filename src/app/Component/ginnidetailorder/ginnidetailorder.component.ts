import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { PaymentService } from '../../Services/payment.service';
import { OrderService } from '../../Services/order.service';

@Component({
  selector: 'app-ginnidetailorder',
  templateUrl: './ginnidetailorder.component.html',
  styleUrl: './ginnidetailorder.component.css'
})
export class GinnidetailorderComponent {
  orderId: any;
  orderDetails: any;
  shippingPrice: number = 50;

  constructor(private route: ActivatedRoute,  private productService : ProductService, 
    private paymentService : PaymentService, private orderService : OrderService) { }

  ngOnInit(): void {
     // Get the order name from route parameters
     this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      console.log(this.orderId);

      this.getOrderDetails(this.orderId);
    });
  }

  getOrderDetails(orderId : string) : void {
    this.orderService.getOrderByID(orderId).subscribe({
      next: (data: any) => {
        data.value.forEach((item: { imageData: string; }) => {
          if (item.imageData) {
            // Prepend 'data:image/jpeg;base64,' to the imageData field
            item.imageData = 'data:image/jpeg;base64,' + item.imageData;
          }
        });
        this.orderDetails = data.value;
        console.log(this.orderDetails)
      },
      error: (err: any) => {
        console.error('Error fetching addresses:', err);
      }
    });
  }


  calculateTotalAmount(orderDetails: any[]): number {
    let total = 0;
    for (let i = 0; i < Math.min(orderDetails.length, 3); i++) {
      total += orderDetails[i].totalAmount;
    }
    return total;
  }

  calculateTax(totalAmount: number): number {
    const taxPercentage = 0.12; // 12% tax rate
    return totalAmount * taxPercentage;
  }

  calculateTotalAmountWithTax(orderDetails: any[]): number {
    const totalAmount = this.calculateTotalAmount(orderDetails);
    const taxAmount = this.calculateTax(totalAmount);
    const shippingAmount = this.shippingPrice;
    return totalAmount + taxAmount + shippingAmount;
  }
}
