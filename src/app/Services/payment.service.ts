import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string = 'https://localhost:7132/api/Payment/';

  constructor(private http: HttpClient, private router: Router) { }

  
  createOrder(amount: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}create-order?amount=${amount}`,{amount:amount});
  }

  confirmPayment(response: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}confirm-payment`, response);
  }

  refundPayment(orderId: string, paymentId: string) {
    return this.http.post<any>(`${this.baseUrl}refund-payment`,  { razorpay_order_id: orderId, razorpay_payment_id: paymentId });
  }

  failurePayment(orderId: string) {
    return this.http.post<any>(`${this.baseUrl}failure-payment`, {razorpay_order_id: orderId});
  }
}
