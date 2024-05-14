import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartList } from '../Component/ginnicombos/ginnicombos.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'https://localhost:7132/api/Carts/';

  private countCartItem = new BehaviorSubject<number>(0);
  countCart$ = this.countCartItem.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  addtoCart(product : any) {
    return this.http.post<any>(`${this.baseUrl}addCart`, product)
  }

  addToCart(cartItem: CartList): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addToCart`, cartItem);
  }

  getToCart(){
    return this.http.get<any[]>(`${this.baseUrl}getCart`); 
  }

  getToCarts(userId: string): Observable<CartList[]> {
    return this.http.get<CartList[]>(`${this.baseUrl}getCarts/${userId}`);
  }
  
  updateCartItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateCartQuantity/${item.id}`, item);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${itemId}`);
  }

  emptyCart(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteAllItem/${userId}`);
  }

  addToWishlist(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addToWishlist`, item);
  }

  updateCount(count: number) {
    console.log("Updating count to:", count); // Add this for debugging
    this.countCartItem.next(count);
  }
  
}
