import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl: string = 'https://localhost:7132/api/Wishlist/';

  constructor(private http: HttpClient, private router: Router) { }

  addToWishlist(product : any) {
    return this.http.post<any>(`${this.baseUrl}addWishlist`, product);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${itemId}`);
  }

  getToWishlist(){
    return this.http.get<any[]>(`${this.baseUrl}getWishlist`); 
  }

  updateWishlistItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateWishlistQuantity/${item.id}`, item);
  }

  emptyWishlist(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteAllItem`);
  }

  updateWishlistStatus(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateWishlistStatus`, product);
  }
  
}
