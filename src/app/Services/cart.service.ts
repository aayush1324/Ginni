import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = 'https://localhost:7132/api/Cart/';

  constructor(private http: HttpClient, private router: Router) { }

  addtoCart(product : any) {
    return this.http.post<any>(`${this.baseUrl}addCart`, product)
  }

  getToCart(){
    return this.http.get<any[]>(`${this.baseUrl}getCart`); 
  }

  updateCartItem(item: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}updateCartQuantity/${item.id}`, item);
  }

  removeItem(itemId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteItem/${itemId}`);
  }

  emptyCart(): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}deleteAllItem`);
  }

  addToWishlist(item: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}addToWishlist`, item);
  }


  // CreateOrder(amount:number,user:number)
  // {
  //   let _headers: HttpHeaders = new HttpHeaders({
  //     'accept': 'text/plain'
  //   });
    
  //   //http call to api endpoint
  //   return this.http.post(this.url+'security/createorder?amount='+amount+'&user='+user,null,{headers:_headers,responseType:'text'})
  //               .pipe(map(response=>response));
  // }
  
}
