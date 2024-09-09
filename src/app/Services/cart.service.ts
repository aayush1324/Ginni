import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private baseUrl: string = 'https://ginnidryfruit.azurewebsites.net/api/Carts/';
  // private baseUrl: string = 'https://localhost:7132/api/Carts/';
  private baseUrl = environment.baseUrl + '/Carts/';



  private countCartItem = new BehaviorSubject<number>(0);
  countCart$ = this.countCartItem.asObservable();
  
  private productCartSubject = new BehaviorSubject<any[]>([]);
  productCart$ = this.productCartSubject.asObservable();

  private cartUpdated = new Subject<void>();
  cartUpdated$ = this.cartUpdated.asObservable();

  
  private cartUpdatedSubject =  new BehaviorSubject<any[]>([]);
  cartUpdate$ = this.cartUpdatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }

  updateCount(count: number) {
    this.countCartItem.next(count);
  }

  //Add to Cart and cart component
  updateCartData(data :any) {
    this.cartUpdatedSubject.next(data);
  }

  updateCart(cartItems : any[]){
    console.log(cartItems);
    console.log("service");
    this.productCartSubject.next(cartItems);
  }

  addToCarts(userId : string, productId : string): Observable<any> {
    // const token = sessionStorage.getItem("token");  
    this.cartUpdated.next();

    const token = this.auth.getToken();  

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.baseUrl}addToCarts/${userId}/${productId}`, null, {headers});
  }


  // getToCarts(userId: string): Observable<any> {
  //   const token = sessionStorage.getItem("token");  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get<any>(`${this.baseUrl}getCarts/${userId}`, {headers});
  // }

  getToCarts(userId: string): Observable<any> {
    if (!userId) {
      // If userId is null or undefined, return an observable of null
      return of(null);
    }
  
    // const token = sessionStorage.getItem("token");  
    const token = this.auth.getToken();  

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.baseUrl}getCarts/${userId}`, { headers });
  }



  removeItem(userId : string, itemId: string): Observable<any> {
    // const token = sessionStorage.getItem("token");  
    const token = this.auth.getToken();  

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteCartItem/${userId}/${itemId}`, {headers});
  }


  emptyCart(userId: string): Observable<any> {
    // const token = sessionStorage.getItem("token");  

    const token = this.auth.getToken();  

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.baseUrl}deleteAllCartItem/${userId}`, {headers});
  }


  updateCartItem(item: any): Observable<any> {
    // const token = sessionStorage.getItem("token");  
    const token = this.auth.getToken();  

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
