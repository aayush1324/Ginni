import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Wishlists/';
  private baseUrl: string = 'https://localhost:7132/api/Wishlists/';


  private countWishListItem = new BehaviorSubject<number>(0);
  countWishList$ = this.countWishListItem.asObservable();
  
  constructor(private http: HttpClient, private router: Router) { }

  updateCount(count: number) {
    this.countWishListItem.next(count);
  }


  addToWishlists(userId : string, productId : string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addWishlistItem/${userId}/${productId}`, null, {headers});
  }

  // getToWishlists(userId: string): Observable<any>{
  //   const token = sessionStorage.getItem("token");  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get<any>(`${this.baseUrl}getWishlistItem/${userId}`, {headers}); 
  // }

  getToWishlists(userId: string): Observable<any> {
    if (!userId) {
      // If userId is null or undefined, return an observable of null
      return of(null);
    }
  
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getWishlistItem/${userId}`, { headers });
  }

  
  removeItems(userId: string, productId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteWishlistItem/${userId}/${productId}`, {headers});
  }

  emptyWishlist(userId: string): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteAllWishlistItem/${userId}`, {headers});
  }

  updateWishlistItem(item: any): Observable<any> {
    const token = sessionStorage.getItem("token");  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.baseUrl}updateWishlistQuantity`, item, {headers});
  }



  


  addToWishlist(wishlistItem : any) {
    return this.http.post<any>(`${this.baseUrl}addWishlist`, wishlistItem);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${itemId}`);
  }

  getToWishlist(){
    return this.http.get<any[]>(`${this.baseUrl}getWishlist`); 
  }

  updateWishlistStatus(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateWishlistStatus`, product);
  }


  
}
