import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Orders/';
  // private baseUrl: string = 'https://localhost:7132/api/Orders/';
  private baseUrl = environment.baseUrl + '/Orders/';



  constructor(private http: HttpClient, private router: Router) { }

  createOrders(userId: string): Observable<string> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<string>(`${this.baseUrl}createOrder/${userId}`, null, {headers});
  }

  createOrder(userId: any, productId: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}createOrder/${userId}/${productId}`, null, {headers});
  }

  
  getOrder(userId: any) {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(`${this.baseUrl}getOrder/${userId}`, {headers});
  }

  getOrderByID(orderID : string) : Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getOrderById/${orderID}`, {headers});
  }

  getOrders(): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getOrders`, {headers});
  }
}
