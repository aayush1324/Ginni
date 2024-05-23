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
    return this.http.post<any>(`${this.baseUrl}addToCarts/${userId}/${productId}`, null);
  }


  getToCarts(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getCarts/${userId}`);
  }


  removeItem(userId : string, itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${userId}/${itemId}`);
  }


  emptyCart(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteAllItem/${userId}`);
  }


  updateCartItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateCartQuantity`, item);
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
