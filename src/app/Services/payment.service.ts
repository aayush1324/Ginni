import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Payments/';

  constructor(private http: HttpClient, private router: Router) { }

  createOrders(amount: number, orderId:string, userId : string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}create-order?amount=${amount}&orderId=${orderId}&userId=${userId}`,{amount:amount, orderId:orderId, userId:userId}, {headers});
  }

  confirmPayments(response: any, orderId: string, userID: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}confirm-payment?orderId=${orderId}&userID=${userID}`, response, {headers});
  }

  refundPayment(orderId: string, paymentId: string) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}refund-payment`,  { razorpay_order_id: orderId, razorpay_payment_id: paymentId }, {headers});
  }

  failurePayment(orderId: string) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}failure-payment`, {razorpay_order_id: orderId}, {headers});
  }





  
  createOrder(amount: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}create-order?amount=${amount}`,{amount:amount});
  }

  confirmPayment(response: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}confirm-payment`, response);
  }

  getOrder(userId: any) {
    return this.http.get<any[]>(`${this.baseUrl}getOrder?userId=${userId}`);
  }

  getOrderByID(orderID : string) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getOrderById/${orderID}`);
  }
}
