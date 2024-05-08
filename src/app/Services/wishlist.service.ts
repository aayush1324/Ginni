import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WishlistItem } from '../Component/ginnicombos/ginnicombos.component';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl: string = 'https://localhost:7132/api/Wishlist/';

  private countWishListItem = new BehaviorSubject<number>(0);
  countWishList$ = this.countWishListItem.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  addToWishlist(wishlistItem : any) {
    return this.http.post<any>(`${this.baseUrl}addWishlist`, wishlistItem);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${itemId}`);
  }

  removeItems(userId: string, productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${userId}/${productId}`);
  }

  getToWishlist(){
    return this.http.get<any[]>(`${this.baseUrl}getWishlist`); 
  }

  getToWishlists(userId: string): Observable<WishlistItem[]>{
    return this.http.get<WishlistItem[]>(`${this.baseUrl}getWishlists/${userId}`); 
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
  updateCount(count: number) {
    debugger;
    console.log("Updating count to:", count); // Add this for debugging
    this.countWishListItem.next(count);
  }
  
}
