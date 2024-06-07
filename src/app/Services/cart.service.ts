import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'https://localhost:7132/api/Carts/';

  private countCartItem = new BehaviorSubject<number>(0);
  countCart$ = this.countCartItem.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  updateCount(count: number) {
    this.countCartItem.next(count);
  }


  addToCarts(userId : string, productId : string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addToCarts/${userId}/${productId}`, null, {headers});
  }


  getToCarts(userId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getCarts/${userId}`, {headers});
  }


  removeItem(userId : string, itemId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteCartItem/${userId}/${itemId}`, {headers});
  }


  emptyCart(userId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteAllCartItem/${userId}`, {headers});
  }


  updateCartItem(item: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}updateCartQuantity`, item, {headers});
  }









  addToWishlist(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addToWishlist`, item);
  }


  addtoCart(product : any) {
    return this.http.post<any>(`${this.baseUrl}addCart`, product)
  }

  addToCart(cartItem: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addToCart`, cartItem);
  }

  getToCart(){
    return this.http.get<any[]>(`${this.baseUrl}getCart`); 
  }

}
