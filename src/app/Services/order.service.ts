import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = 'https://localhost:7132/api/Orders/';

  constructor(private http: HttpClient, private router: Router) { }

  createOrders(userId: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}createOrder/${userId}`, null);
  }

  createOrder(userId: any, productId: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}createOrder/${userId}/${productId}`, null);
  }

  
  getOrder(userId: any) {
    return this.http.get<any[]>(`${this.baseUrl}getOrder/${userId}`);
  }

  getOrderByID(orderID : string) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getOrderById/${orderID}`);
  }

  getOrders(): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getOrders`, {headers});
  }
}
